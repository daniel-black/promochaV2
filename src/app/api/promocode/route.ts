import { prisma } from "@/lib/db";
import { NewPromcodeSchema } from "@/lib/zod";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const data = NewPromcodeSchema.parse({
    ...body,
    start: new Date(body.start),
    end: new Date(body.end),
  });

  const promocode = await prisma.promocode.create({ data });

  console.log(promocode)

  return NextResponse.json(promocode);
}
