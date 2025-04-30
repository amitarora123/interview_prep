"use client";
import Image from "next/image";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { z } from "zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const interviewSchema = z.object({
  type: z.enum(["technical", "behavioural", "other"]),
  role: z.string(),
  techStack: z.string(),
  duration: z.enum(["10", "30", "60"]),
  profilePicture: z.instanceof(File).optional(),
});

type InterviewFormValues = z.infer<typeof interviewSchema>;

const InterviewConfirmation = ({
  form,
  onSubmit,
}: {
  form: UseFormReturn<InterviewFormValues>;
  onSubmit: (values: InterviewFormValues) => void;
}) => {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  return (
    <div className="lg:min-w-[566px]  border-gradient mx-auto card-border rounded-[20px] gap-[36px] bg-gradient-to-b from-[#1A1C20] to-[#08090D] border-2  shadow-[0px_0px_70px_0px_rgba(0,0,0,0.2)]">
      <div className="flex items-center flex-col px-16 py-2">
        <div className="flex justify-center gap-2 items-center mb-5">
          <Image src="/logo.svg" width={30} height={30} alt="logo" />
          <h1 className="font-semibold text-3xl text-indigo-200">PrepWise</h1>
        </div>
        <p className="font-semibold  text-2xl">Starting Your Interview</p>
        <p className="text-sm my-2 text-white">
          Customize your mock interview to suit your needs.
        </p>

        <div className=" my-8 w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      What type of interview would you like to practice?
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full mt-2 rounded-full">
                          <SelectValue placeholder="Select interview type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technical">Technical</SelectItem>
                          <SelectItem value="behavioural">
                            Behavioural
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-2">
                      What role are you focusing on?
                    </FormLabel>
                    <FormControl>
                      <Input
                        required
                        className="rounded-full placeholder:text-sm placeholder:text-[#8E96AC] "
                        placeholder="Select your role"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="techStack"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-2">
                      Which tech stack would you like to focus on?{" "}
                    </FormLabel>
                    <FormControl>
                      <Input
                        required
                        className="rounded-full placeholder:text-sm placeholder:text-[#8E96AC] "
                        placeholder="Select your preferred tech stack"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      How long would you like the interview to be?{" "}
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full mt-2 rounded-full">
                          <SelectValue placeholder="Select interview type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">60 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="profilePicture"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-2">Profile Picture</FormLabel>
                    <FormControl>
                      <div>
                        <Input
                          type="file"
                          ref={fileRef}
                          className="rounded-full hidden placeholder:text-sm text-center placeholder:text-[#8E96AC] "
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              field.onChange(file);
                              setProfilePicture(file);
                            }
                          }}
                        />
                        <Button
                          asChild
                          type="button"
                          className="w-full  text-center rounded-full "
                          variant="outline"
                          onClick={() => fileRef?.current?.click()}
                        >
                          <div>
                            <Image
                              src={
                                profilePicture
                                  ? URL.createObjectURL(profilePicture)
                                  : "/upload.svg"
                              }
                              width={20}
                              height={20}
                              alt="upload"
                              className={`${
                                profilePicture ? "w-5 h-5 object-contain" : ""
                              }`}
                            />
                            <p className="">
                              {" "}
                              {profilePicture
                                ? "Selected Image"
                                : "Upload an image"}
                            </p>
                          </div>
                        </Button>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full text-center rounded-full bg-violet-200"
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default InterviewConfirmation;
