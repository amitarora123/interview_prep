import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="hero-card bg-gradient-to-b from-[#171532] to-[#08090D] px-15 py-10 rounded-xl grid md:grid-cols-2">
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl lg:text-3xl font-mono  font-semibold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-200 to-violet-200">
            Get Interview-Ready with AI-Powered Practice & Feedback
          </span>
        </h1>
        <p className="text-violet-100">
          Practice real interview questions & get instant feedback.
        </p>
        <Button className="rounded-full bg-violet-200 hover:bg-violet-100 transition-colors cursor-pointer duration-150 ease-in  px-8 w-fit text-black">
          <Link href="/interview">Start an Interview</Link>
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
