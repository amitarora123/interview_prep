"use client";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "@/firebase/client";
import {
  googleLogin,
  signIn,
  signUp,
  verifyUser,
} from "@/lib/action/auth.action";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormField from "./FormField";
import Image from "next/image";
import Link from "next/link";

interface AuthFormParams {
  type: FormType;
  uid?: string;
}
const AuthForm = (params: AuthFormParams) => {
  const { type, uid } = params;
  const formSchema = z.object({
    name:
      type === "sign-up"
        ? z.string().min(2, {
            message: "name must be at least 2 characters.",
          })
        : z.string().optional(),
    email:
      type === "verify"
        ? z.string().optional()
        : z.string().email({
            message: "Invalid email address",
          }),
    password:
      type === "verify"
        ? z.string().optional()
        : z.string().min(6, {
            message: "password must be at least 2 characters",
          }),
    verifyCode:
      type === "verify"
        ? z.string().length(6, {
            message: "VerifyCode is of 6 digits",
          })
        : z.string().optional(),
  });

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      verifyCode: "",
    },
  });

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      const idToken = await result.user.getIdToken();
      const response = await googleLogin({
        idToken,
        params: {
          email: result.user.email!,
          name: result.user.displayName!,
          uid: result.user.uid!,
          password: "",
        },
      });
      if (response.success) {
        toast.success(response.message);
        router.replace("/");
      } else {
        toast.error(response.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { email, password, name } = values;
      if (type === "sign-up") {
        const createdUser = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const response = await signUp({
          uid: createdUser.user.uid,
          email: email,
          password: password,
          name: name!,
        });
        if (response.success) {
          toast.success(response.message);
          router.replace(`/verify/${createdUser.user.uid}`);
        } else {
          toast.error(response.message);
        }
      } else if (type === "verify") {
        const response = await verifyUser({
          uid,
          verifyCode: values.verifyCode!,
        } as VerifyUserParams);
        if (response.success) {
          toast.success(response.message);
          router.replace("/sign-in");
        } else {
          toast.error(response.message);
        }
      } else {
        const loggedInUser = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const idToken = await loggedInUser.user.getIdToken(true);

        const response = await signIn({
          idToken,
          email,
        });
        if (response.success) {
          toast.success(response.message);
          router.replace("/");
        } else {
          toast.error(response.message);
          if (response.message === "Please Verify the Account to continue") {
            router.replace(`/verify/${loggedInUser.user.uid}`);
          }
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="lg:min-w-[566px]  border-gradient mx-auto card-border rounded-[20px] gap-[36px] bg-gradient-to-b from-[#1A1C20] to-[#08090D] border-2  shadow-[0px_0px_70px_0px_rgba(0,0,0,0.2)]">
      <div className="flex justify-center items-center flex-col px-16 py-6">
        <div className="flex justify-center gap-2 items-center mb-5">
          <Image src="/logo.svg" width={30} height={30} alt="logo" />
          <h1 className="font-semibold text-3xl text-indigo-200">PrepWise</h1>
        </div>
        <p className="font-semibold  text-center text-2xl">
          Practice job interviews with AI
        </p>

        <div className=" my-5 w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "verify" ? (
                <FormField
                  label="Verify Code"
                  control={form.control}
                  type="text"
                  name="verifyCode"
                />
              ) : (
                <>
                  {type === "sign-up" ? (
                    <FormField
                      label="Name"
                      control={form.control}
                      type="text"
                      name="name"
                    />
                  ) : null}
                  <FormField
                    label="Email"
                    control={form.control}
                    type="email"
                    name="email"
                  />
                  <FormField
                    label="Password"
                    control={form.control}
                    type="password"
                    name="password"
                  />
                </>
              )}

              <Button
                type="submit"
                className="w-full text-center rounded-full bg-violet-200"
              >
                Submit
              </Button>
            </form>
          </Form>
          {type !== "verify" && (
            <Button
              onClick={() => handleGoogleLogin()}
              className="w-full text-center my-3 rounded-full"
              variant="outline"
            >
              <FcGoogle size={24} /> Continue with Google
            </Button>
          )}
        </div>
        {type !== "verify" && (
          <>
            {type === "sign-in" ? (
              <p>
                Don&apos;t have an account?
                <Link href="/sign-up" className="font-bold text-lg ml-1">
                  {" "}
                  Sign up
                </Link>
              </p>
            ) : (
              <p>
                Don&apos;t have an account?
                <Link href="/sign-in" className="font-bold text-lg ml-1">
                  Sign in
                </Link>
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
