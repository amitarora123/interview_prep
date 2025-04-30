"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { getRandomInterviewCover } from "@/lib/utils";
import DisplayTechIcons from "./DisplayTechIcons";
import { useEffect, useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import { getFeedbackByInterviewId } from "@/lib/action/general.action";

const InterviewCard = (params: InterviewCardProps) => {
  const { interviewId, role, type, techstack, createdAt, userId } = params;

  const [feedback, setFeedback] = useState<Feedback|null>(null);
    const [coverImage, setCoverImage] = useState<string | null>(null);
  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("MMM D, YYYY");
  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
  useEffect(() => {
    // Randomize separately for each card

    const randomImg = getRandomInterviewCover();
    setCoverImage(randomImg);
    ( async () => {
      const feedback = await getFeedbackByInterviewId({interviewId, userId} as GetFeedbackByInterviewIdParams );
      console.log(feedback)
      setFeedback(feedback);
    }
    )()
  }, [interviewId, userId]);

  if (!coverImage) return null;
  return (
    <div className="border-gradient rounded-full">
      <Card className="relative card">
        <CardHeader>
          <CardTitle className="flex flex-col gap-5">
            <div>
              {" "}
              <Image
                src={coverImage!}
                className="rounded-full"
                width={80}
                height={80}
                alt="company"
              />
              <p
                className={`absolute top-0 right-0 rounded-bl-xl font-normal rounded-tr-xl px-[14px] py-2.5  text-white ${
                  normalizedType.toLowerCase() === "mixed"
                    ? "bg-[#6870A6]"
                    : "bg-[#24273A]"
                }`}
              >
                {type}
              </p>
            </div>

            <h3 className="text-xl">{role}</h3>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div className="flex items-center gap-5 ">
            <div className="flex gap-2 font-light text-sm items-center">
              <Image
                src="/calendar.svg"
                alt="calendar"
                width={25}
                height={25}
              />
              <p>{formattedDate}</p>
            </div>
            <div className="flex gap-2 font-light text-sm items-center">
              <Image
                src="/star.svg"
                alt="star"
                width={25}
                height={25}
                className=""
              />
              <p>{feedback?.totalScore ? feedback?.totalScore: "--"} /100</p>
            </div>
          </div>
          <p className="text-base leading-6 text-[#D6E0FF]">
            This interview does not reflect serious interest or engagement from
            the candidate. Their responses are dismissive, vague, or outright
            negative, making it more
          </p>
        </CardContent>
        <CardFooter>
          <div className="flex items-center justify-between w-full">
            <DisplayTechIcons techStack={techstack} />
            <Link
              href={`${
                feedback
                  ? `/interview/${interviewId}/feedback`
                  : `/interview/${interviewId}`
              } `}
              className="bg-violet-300 px-3 py-2 text-black rounded-full text-xs font-semibold text-nowrap  "
            >
              {feedback ? "View Feedback" :  "View Interview"  }
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default InterviewCard;
