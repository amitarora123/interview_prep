import Navbar from "@/components/Navbar";
import { getCurrentUser } from "@/lib/action/auth.action";
import { redirect } from "next/navigation";

const RootLayout = async ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    const user = await getCurrentUser();
    
      if (!user){
        redirect("/sign-in");
      }
  return (
    <main className="root-layout">
        <Navbar />
        {children}
    </main>
  )
}

export default RootLayout