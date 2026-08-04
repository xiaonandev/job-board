import JobsFilter from "@/components/jobs/JobsFilter";
import PaginationButton from "@/components/ui/PaginationButton";
import { prisma } from "@/src/lib/prisma";
import { Prisma } from "@prisma/client";
import Link from "next/link";

const JobsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const PAGE_SIZE = 10;

  const { q, type, location, posted, page } = await searchParams;
  const query = q as string | undefined;
  const searchType = type as string | undefined;
  const searchLocation = location as string | undefined;
  const searchPostedAt = posted as string | undefined;
  const searchPage = Number(page) || 1;
  const days = Number(searchPostedAt);
  const startDate = searchPostedAt
    ? new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    : undefined;

  const where: Prisma.JobWhereInput = {
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
      location
        ? { location: { contains: searchLocation, mode: "insensitive" } }
        : {},
      posted && startDate
        ? {
            postedAt: {
              gte: startDate,
            },
          }
        : {},
    ],
  };

  const jobs = await prisma.job.findMany({
    where: where,
    skip: (searchPage - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    orderBy: { postedAt: "desc" },
  });

  const totalJobs = await prisma.job.count({
    where: where,
  });
  const totalPages = Math.ceil(totalJobs / PAGE_SIZE);

  return (
    <div className="space-y-8">
      <JobsFilter />
      <PaginationButton page={searchPage} totalPages={totalPages} />

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
            <div className="flex justify-end items-center mt-6">
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
