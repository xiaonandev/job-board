"use client";

import { useRouter } from "next/navigation";
import React from "react";

const JobsFilter = () => {
  const router = useRouter();
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const q = formData.get("q") as string;
    const type = formData.get("type") as string;
    const location = formData.get("location") as string;

    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (type) params.set("type", type);
    if (location) params.set("location", location);

    router.push(`/jobs?${params.toString()}`, { scroll: false });
  };
  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Find Jobs</h1>
        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-3">
          <input
            type="text"
            name="q"
            placeholder="Search jobs..."
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
          />
          <select
            name="type"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
          >
            <option value="">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
          <input
            type="text"
            name="location"
            placeholder="Location"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
          />
          <button
            type="submit"
            className="md:col-span-3 bg-indigo-800 text-white px-4 py-2 rounded-md hover:bg-indigo-900"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobsFilter;
