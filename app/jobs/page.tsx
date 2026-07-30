import JobsFilter from "@/components/jobs/JobsFilter";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import React from "react";

const JobsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { q, type, location } = await searchParams;
  const query = q as string | undefined;
  const searchType = type as string | undefined;
  const searchLocation = location as string | undefined;

  const jobs = await prisma.job.findMany({
    where: {
      AND: [
        q
          ? {
              OR: [
                { title: { contains: query, mode: "insensitive" } },
                { company: { contains: query, mode: "insensitive" } },
                { description: { contains: query, mode: "insensitive" } },
              ],
            }
          : {},
        type ? { type: searchType } : {},
        searchLocation
          ? { location: { contains: searchLocation, mode: "insensitive" } }
          : {},
      ],
    },
    orderBy: { postedAt: "desc" },
    include: { postedBy: true },
  });
  return (
    <div className="space-y-8">
      <JobsFilter />
      <div className="grid gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {job.title}
                </h2>
                <p className="text-gray-600 mb-2">{job.company}</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span className="mr-4">{job.location}</span>
                  <span>{job.type}</span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {job.description}
                </p>
                {job.salary && (
                  <span className="text-lg font-semibold text-gray-900">
                    {job.salary}
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center mt-6">
              <span className="text-sm text-gray-500">
                Posted by {job.postedBy.name}
              </span>
              <Link
                href={`/jobs/${job.id}`}
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default JobsPage;
