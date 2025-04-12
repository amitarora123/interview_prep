/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { logout } from "@/lib/action/auth.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const performLogout = async () => {
    try {
      const response = await logout();
      if (response.success) {
        toast.success(response.message);
        router.replace("/sign-in");
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <header className="w-full h-40 container mx-auto">
      <nav className="flex h-full items-center justify-between">
        <p className="flex gap-1 text-2xl font-semibold ">
          <Image src="/logo.svg" height={24} width={26} alt="logo" />
          PrepWise
        </p>

        <Button
          variant="outline"
          className="text-violet-200  bg-black cursor-pointer"
          onClick={() => performLogout()}
        >
          {" "}
          Sign Out
        </Button>
      </nav>
    </header>
  );
};

export default Navbar;
