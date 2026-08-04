import { prisma } from "@/src/lib/prisma";

async function main() {
  const jobs = Array.from({ length: 30 }, (_, index) => ({
    title: `Frontend Developer ${index + 1}`,
    company: `Company ${index + 1}`,

    location:
      index % 3 === 0 ? "Rotterdam" : index % 3 === 1 ? "Amsterdam" : "Utrecht",

    type: index % 2 === 0 ? "Full-time" : "Part-time",

    description: `This is test job ${index + 1}.`,

    salary: `€${3000 + index * 50}`,

    postedAt: new Date(Date.now() - index * 24 * 60 * 60 * 1000),

  }));

  await prisma.job.createMany({
    data: jobs,
  });

  console.log("30 jobs created");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
