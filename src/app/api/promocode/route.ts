import { prisma } from "@/lib/db";
import { NewPromcodeSchema, UpdatePromocodeSchema } from "@/lib/zod";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const data = NewPromcodeSchema.parse({
      ...body,
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

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const parsedBody = UpdatePromocodeSchema.parse(body);

  const { userId } = getAuth(req);

  if (!userId) {
    return new Response(null, {
      status: 401,
      statusText: 'Unauthorized request',
    });
  }

  // this code is jank
  const updateData = {} as any;
  if (parsedBody.code) updateData.code = parsedBody.code
  if (parsedBody.discount) updateData.discount = parsedBody.discount
  if (parsedBody.maxDiscount) updateData.maxDiscount = parsedBody.maxDiscount
  if (parsedBody.start) updateData.start = new Date(parsedBody.start)
  if (parsedBody.end) updateData.end = new Date(parsedBody.end)

  console.log({updateData})

  try {
    const updatedPromocode = await prisma.promocode.update({
      where: { id: parsedBody.id },
      data: { ...updateData }
    });

     console.log(updatedPromocode)

    // const updatedPromocode = { msg: 'hi' }
    return NextResponse.json(updatedPromocode.code);
  } catch (e) {
    // if (e instanceof ZodError) {
    //   return new Response(null, {
    //     status: 400,
    //     statusText: e.toString(),
    //   });
    // }

    return new Response(null, {
      status: 500,
      statusText: JSON.stringify(e),
    });
  }
}