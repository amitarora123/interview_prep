"use client";
import { vapi } from "@/lib/vapi";

import React, { useEffect } from "react";

const VapiAssistant = () => {
  const assistantId = process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID;

  const startVapi = async () => {
    const response = await vapi.start(assistantId);
    vapi.on("speech-start", () => {
      console.log("Speech has started");
    });

    vapi.on("speech-end", () => {
      console.log("Speech has ended");
    });

    vapi.on("call-start", () => {
      console.log("Call has started");
    });

    vapi.on("call-end", () => {
      console.log("Call has stopped");
    });

    vapi.on("volume-level", (volume) => {
      console.log(`Assistant volume level: ${volume}`);
    });

    vapi.on("message", (message) => {
      console.log(message);
    });

    vapi.on("error", (e) => {
      console.error(e);
    });
  };

  useEffect(() => {
    startVapi();
  }, []);
  return <div>VapiAssistant</div>;
};

export default VapiAssistant;
