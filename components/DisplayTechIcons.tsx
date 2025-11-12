"use client";
import { cn } from "@/lib/utils";
import { getTechLogos } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

const DisplayTechIcons = ({ techStack }: TechIconProps) => {
  const [techLogos, setTechLogos] = useState<
    Array<{ tech: string; url: string }>
  >([]);
  useEffect(() => {
    (async () => {
      const result = await getTechLogos(techStack);
      setTechLogos(result);
    })();
  }, []);
  return (
    <div className="flex">
      {techLogos.slice(0, 3).map(({ tech, url }, index) => (
        <div
          key={index}
          className={cn(
            "group bg-dark-300 rounded-full relative p-2 flex-center",
            index >= 1 ? "-ml-3" : ""
          )}
        >
          {" "}
          <span className="tech-tooltip">{tech}</span>
          <Image width={25} height={25} src={url} alt={tech} />
        </div>
      ))}
    </div>
  );
};

export default DisplayTechIcons;
