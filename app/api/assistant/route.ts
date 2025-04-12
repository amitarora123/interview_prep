"use client";
import { vapi } from "@/lib/vapi";

const assistantId = process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID;

vapi.start(assistantId);
