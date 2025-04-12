import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <div className="hero-card bg-gradient-to-b from-[#171532] to-[#08090D] py-10 px-5 rounded-xl grid md:grid-cols-2">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl lg:text-4xl font-semibold">
          Get Interview-Ready with AI-Powered Practice & Feedback
        </h1>
        <p className="text-violet-100">
          Practice real interview questions & get instant feedback.
        </p>
        <Button className="rounded-full bg-violet-200 hover:bg-violet-100 transition-colors cursor-pointer duration-150 ease-in  px-8 w-fit text-black">
          Start an Interview
        </Button>
      </div>
      <div className="flex justify-center items-center">
        <Image
          className="max-md:hidden"
          src="/robot.png"
          width={300}
          height={300}
          alt="robot"
        />
      </div>
    </div>
  );
};

export default Hero;
