/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";
import { signOut } from "firebase/auth";
import { auth as clientAuth } from "@/firebase/client";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
const ONE_WEEK = 60 * 60 * 24 * 7;

const generateOtp = (): string => {
  const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
  return verifyCode;
};

const generateVerifyCodeExpiry = (): Date => {
  return new Date(Date.now() + 3600000);
};
export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;
  try {
    const userRecord = await db.collection("users").doc(uid).get();

    if (userRecord.exists) {
      return {
        success: false,
        message: "User already exists. Please sign in instead.",
      };
    }

    const verifyCode = generateOtp();

    const verifyCodeExpiry = generateVerifyCodeExpiry();
    await db.collection("users").doc(uid).set({
      name,
      email,
      verifyCode,
      verifyCodeExpiry,
      isVerified: false,
    });
    await sendVerificationEmail(email, name, verifyCode);
    return {
      success: true,
      message: "User registered successfully, please verify to continue",
    };
  } catch (error: any) {
    console.error("Error creating a user ", error);

    if (error.code === "auth/email-already-exists") {
      return {
        success: false,
        message: "This email is already in use.",
      };
    }
    return {
      success: false,
      message: "Failed to create an account",
    };
  }
}

export async function verifyUser(params: VerifyUserParams) {
  const { verifyCode, uid } = params;

  const userRecordRef = db.collection("users").doc(uid);
  const userRecord = await userRecordRef.get();
  const userData = userRecord.data();

  if (!userData) {
    return {
      success: false,
      message: "user does not exist please register instead",
    };
  }

  if (userData.verifyCode === verifyCode) {
    await userRecordRef.update({
      isVerified: true,
    });
    return {
      success: true,
      message: "User verified successfully",
    };
  } else {
    return {
      success: false,
      message: "Invalid verification code.",
    };
  }
}

export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();

  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: ONE_WEEK * 1000,
  });

  cookieStore.set("session", sessionCookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: ONE_WEEK,
    path: "/",
  });
  return sessionCookie;
}
export async function signIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);

    if (!userRecord) {
      return {
        success: false,
        message: "User does not exist. Create an account instead.",
      };
    }
    const userData = (
      await db.collection("users").doc(userRecord.uid).get()
    ).data();

    if (!userData) {
      return {
        success: false,
        message: "User does not exist. Create an account instead.",
      };
    }

    if (!userData.isVerified) {
      return {
        success: false,
        message: "Please Verify the Account to continue",
      };
    }

    await setSessionCookie(idToken);

    return {
      success: true,
      message: "login successful",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "User does not exist. Create an account instead.",
    };
  }
}
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  if (!sessionCookie) return null;

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    const userRecord = await db
      .collection("users")
      .doc(decodedClaims.uid)
      .get();
    if (!userRecord.exists) return null;

    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return !!user;
}
export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  try {
    signOut(clientAuth);
    return {
      success: true,
      message: "Logout successful",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Unable to perform logout",
    };
  }
}
export async function googleLogin({
  params,
  idToken,
}: {
  params: SignUpParams;
  idToken: string;
}) {
  const { name, email, uid } = params;

  const existedUser = await db.collection("users").doc(uid).get();
  if (!existedUser.exists) {
    await db.collection("users").doc(uid).set({
      name,
      email,
      isVerified: true,
    });
  }

  const response = signIn({ email, idToken });

  return response;
}
