import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ jobId: string }> },
) {
  try {
    const { jobId } = await params;
    const job = await prisma.job.findUnique({ where: { id: jobId } });

    if (!job) {
      return new NextResponse("Job not found", { status: 404 });
    }
    const application = await prisma.application.create({
      data: {
        jobId: jobId,
        status: "PENDING",
      },
    });
    return NextResponse.json(application);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
