import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const job = await prisma.job.create({
      data,
    });
    return NextResponse.json(job);
  } catch (error) {
    console.error("error:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: {
        postedAt: "desc",
      },
    });
    return NextResponse.json(jobs);
  } catch (error) {
    console.error("error:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
