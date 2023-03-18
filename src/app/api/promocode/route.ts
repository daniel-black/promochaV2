import { prisma } from "@/lib/db";
import { NewPromcodeSchema } from "@/lib/zod";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const data = NewPromcodeSchema.parse({
      ...body,
      start: new Date(body.start),
      end: new Date(body.end),
    });
  
    const promocode = await prisma.promocode.create({ data });

    return NextResponse.json(promocode);
  } catch (e) {
    if (e instanceof ZodError) {
      return new Response(null, {
        status: 400,
        statusText: e.toString(),
      });
    }

    return new Response(null, {
      status: 500,
      statusText: JSON.stringify(e),
    });
  }
}
