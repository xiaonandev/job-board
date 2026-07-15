"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ApplyButton({ jobId }: { jobId: string }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [applicationStatus, setApplicationStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const handleApply = async () => {
    if (!session) {
      router.push("/auth/signin");
      return;
    }
    setErrorMessage("");
    setApplicationStatus("idle");
    try {
      const response = await fetch(`/api/jobs/${jobId}/apply`, {
        method: "POST",
      });
      if (response.ok) {
        setApplicationStatus("success");
      } else {
        const errorText = await response.text();
        setErrorMessage(errorText || "Failed to apply.");
        setApplicationStatus("error");
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Failed to apply.");
      }
      setApplicationStatus("error");
    }
  };
  if (status === "loading") {
    return (
      <button
        disabled
        className="w-full bg-indigo-800 text-white px-6 rounded-md opacity-50 cursor-not-allowed"
      >
        Loading...
      </button>
    );
  }

  if (applicationStatus === "success") {
    return (
      <div className="text-center">
        <p className="text-green-600 font-medium mb-4">
          Application submitted successfully!
        </p>
        <Link
          href={"/dashboard"}
          className="text-indigo-800 hover:text-indigo-900 font-meduim"
        >
          View your applications →
        </Link>
      </div>
    );
  }
  return (
    <>
      <button
        onClick={handleApply}
        className="w-full bg-indigo-800 text-white px-6 py-3 rounded-md hover:bg-indigo-900 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Apply
      </button>
      <div className="mt-2 min-h-6 flex justify-center items-center">
        {applicationStatus === "error" && (
          <p className="text-red-700 text-center">{errorMessage}</p>
        )}
      </div>
    </>
  );
}
