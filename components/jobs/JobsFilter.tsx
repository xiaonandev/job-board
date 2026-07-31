"use client";

import { set } from "date-fns";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { FiDelete } from "react-icons/fi";
type Tags = {
  q?: string;
  type?: string;
  location?: string;
};

const JobsFilter = () => {
  const router = useRouter();
  const params = useSearchParams();
  const q = params.get("q");
  const type = params.get("type");
  const location = params.get("location");

  const [tags, setTags] = useState<Tags>({});
  const entries = Object.entries(tags) as [keyof Tags, string][];
  const updateSearch = (newTags: Tags) => {
    const params = new URLSearchParams();

    if (newTags.q) params.set("q", newTags.q);
    if (newTags.type) params.set("type", newTags.type);
    if (newTags.location) params.set("location", newTags.location);

    setTags(newTags);

    router.push(`/jobs?${params.toString()}`, {
      scroll: false,
    });
  };

  const removeTag = (key: keyof Tags) => {
    const newTags = { ...tags };

    delete newTags[key];

    updateSearch(newTags);
  };

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

    const newTags: Tags = {};

    if (q) newTags.q = q;
    if (type) newTags.type = type;
    if (location) newTags.location = location;

    updateSearch(newTags);
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
        {entries.map(([key, value]) => {
          return (
            <div
              key={key}
              className="mt-5 inline-flex gap-2 bg-gray-200 border-gray-300 border rounded-full px-2 mx-1"
            >
              <p>{value}</p>
              <button onClick={() => removeTag(key)}>
                <FiDelete />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JobsFilter;
