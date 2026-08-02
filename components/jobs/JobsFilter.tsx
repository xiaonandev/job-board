"use client";

import { set } from "date-fns";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FiDelete } from "react-icons/fi";
type Tags = {
  q?: string;
  type?: string;
  location?: string;
  posted?: string;
};
const postedLabels = {
  "1": "Past 24 hours",
  "3": "Past 3 days",
  "30": "Past month",
};

const JobsFilter = () => {
  const router = useRouter();
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const type = params.get("type") ?? "";
  const location = params.get("location") ?? "";
  const posted = params.get("posted") ?? "";

  const [tags, setTags] = useState<Tags>({});
  const entries = Object.entries(tags) as [keyof Tags, string][];

  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    const newTags: Tags = {};

    if (q) newTags.q = q;
    if (type) newTags.type = type;
    if (location) newTags.location = location;
    setTags(newTags);
  }, []);

  const updateSearch = (newTags: Tags) => {
    const params = new URLSearchParams();

    if (newTags.q) params.set("q", newTags.q);
    if (newTags.type) params.set("type", newTags.type);
    if (newTags.location) params.set("location", newTags.location);
    if (newTags.posted) params.set("posted", newTags.posted);

    setTags(newTags);

    router.push(`/jobs?${params.toString()}`, {
      scroll: false,
    });
  };

  const removeTag = (key: keyof Tags) => {
    const newTags = { ...tags };

    delete newTags[key];

    const form = formRef.current;

    if (form) {
      const field = form.elements.namedItem(key);

      if (
        field instanceof HTMLInputElement ||
        field instanceof HTMLSelectElement
      ) {
        field.value = "";
      }
    }

    updateSearch(newTags);
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const q = formData.get("q") as string;
    const type = formData.get("type") as string;
    const location = formData.get("location") as string;
    const posted = formData.get("posted") as string;

    const newTags: Tags = {};

    if (q) newTags.q = q;
    if (type) newTags.type = type;
    if (location) newTags.location = location;
    if (posted) newTags.posted = posted;

    updateSearch(newTags);
  };

  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Find Jobs</h1>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="grid gap-4 md:grid-cols-3"
        >
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Search jobs..."
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
          />
          <select
            name="type"
            defaultValue={type}
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
            defaultValue={location}
            name="location"
            placeholder="Location"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
          />
          <select
            name="posted"
            defaultValue={posted}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
          >
            <option value="">Any time</option>
            <option value="1">Past 24 hours</option>
            <option value="3">Past 3 days</option>
            <option value="30">Past month</option>
          </select>

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
              <p>
                <p>
                  {key === "posted"
                    ? postedLabels[value as keyof typeof postedLabels]
                    : value}
                </p>
              </p>
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
