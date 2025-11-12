import Hero from "@/components/Hero";
import InterviewCard from "@/components/InterviewCard";
import { getCurrentUser } from "@/lib/action/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/action/general.action";

const Home = async () => {
  const user = await getCurrentUser();

  const [userInterviews, allInterview] = await Promise.all([
    getInterviewsByUserId(user!.id!),
    getLatestInterviews({ userId: user!.id! }),
  ]);

  const hasPastInterviews = userInterviews!.length! > 0;
  const hasUpcomingInterviews = allInterview!.length! > 0;

  return (
    <div>
      <Hero />

      <div className="my-10">
        <h3>Your Past Interviews</h3>

        {hasPastInterviews ? (
          <div className="grid lg:grid-cols-3  sm:grid-cols-2 gap-10 my-10">
            {userInterviews?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))}
          </div>
        ) : (
          <p>You haven&apos;t taken any interviews yet</p>
        )}
      </div>

      <div>
        <h3>Pick Your Interview</h3>
        {hasUpcomingInterviews ? (
          <div className="grid lg:grid-cols-3  sm:grid-cols-2 gap-10 my-10">
            {allInterview?.map((interview) => (
              <InterviewCard
                key={interview.id.toString()}
                {...interview}
                interviewId={interview.id}
              />
            ))}
          </div>
        ) : (
          <p className="py-2">No Interviews Yet</p>
        )}
      </div>
    </div>
  );
};

export default Home;
