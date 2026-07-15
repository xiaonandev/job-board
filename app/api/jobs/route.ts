import { auth } from "@/auth";
import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user || !session.user.id) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  try {
    const data = await request.json();
    const job = await prisma.job.create({
      data: {
        ...data,
        PostedById: session.user.id,
      },
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
