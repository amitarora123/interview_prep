"use client";

import Hero from "@/components/Hero";
import InterviewCard from "@/components/InterviewCard";
import { dummyInterviews } from "@/constants";
import { useState } from "react";
const Home = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [takenInterviews, setTakenInterviews] =
    useState<Interview[]>(dummyInterviews);

  return (
    <div>
      <Hero />

      <div className="my-10">
        <h3>Your Past Interviews</h3>

        {takenInterviews.length > 0 ? (
          <div className="grid lg:grid-cols-3  sm:grid-cols-2 gap-10 my-10">
            {takenInterviews.map((interview) => (
              <InterviewCard key={interview.id.toString()} {...interview} interviewId={interview.id} />
            ))}
          </div>
        ) : (
          <p>No Interviews Yet</p>
        )}
      </div>

      <div>
        <h3>Pick Your Interview</h3>
        {takenInterviews.length > 0 ? (
          <div className="grid lg:grid-cols-3  sm:grid-cols-2 gap-10 my-10">
            {takenInterviews.map((interview) => (
              <InterviewCard key={interview.id.toString()} {...interview} interviewId={interview.id} />
            ))}
          </div>
        ) : (
          <p>No Interviews Yet</p>
        )}
      </div>
    </div>
  );
};

export default Home;
