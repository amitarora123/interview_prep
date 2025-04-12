"use client";

import { useParams } from "next/navigation";

const Feedback = () => {
  const params = useParams();

  return <div>{params.interviewId}</div>;
};

export default Feedback;
