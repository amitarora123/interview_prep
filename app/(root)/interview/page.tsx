import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/action/auth.action";

const InterviewGenerate = async () => {
  const user = await getCurrentUser();

  return (
    <>
      <Agent
        type="generate"
        username={user!.name!}
        userId={user?.id}
        // profileImage={user!.profileURL || ""}
      />
    </>
  );
};

export default InterviewGenerate;
