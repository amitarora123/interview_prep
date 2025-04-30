import Agent from "@/components/Agent";
import { getRandomInterviewCover } from "@/lib/utils";
import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/action/general.action";
import { getCurrentUser } from "@/lib/action/auth.action";
import DisplayTechIcons from "@/components/DisplayTechIcons";
import { redirect } from "next/navigation";
import Image from "next/image";

const InterviewDetails = async ({ params }: RouteParams) => {
  const { interviewId } = await params;
  const user = await getCurrentUser();

  const interview = await getInterviewById(interviewId);

  if (!interview) redirect("/");

  const feedback = await getFeedbackByInterviewId({
    interviewId,
    userId: user?.id!,
  });
  return (
    <>
      <div className="flex flex-row gap-4 justify-between">
        <div className="flex flex-row gap-4 items-center max-sm:flex-col">
          <div className="flex flex-row gap-4 items-center">
            <Image
              src={getRandomInterviewCover()}
              alt="cover-image"
              width={40}
              height={40}
              className="rounded-full object-cover size-[40px]"
            />
            <h3 className="capitalize">{interview.role} Interview</h3>
          </div>

          <DisplayTechIcons techStack={interview.techstack} />
        </div>

        <p className="bg-dark-200 px-4 py-2 rounded-lg h-fit">
          {interview.type}
        </p>
      </div>

      <Agent
        userName={user?.name!}
        userId={user?.id}
        interviewId={interviewId}
        type="interview"
        questions={interview.questions}
        feedbackId={feedback?.id}
      />
    </>
  );
};

export default InterviewDetails;
