import { prisma } from "@/lib/db";
import { IdSchema, NewPromcodeSchema, UpdatePromocodeSchema } from "@/lib/zod";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const data = NewPromcodeSchema.parse({
      ...body,
    });

    const codeAlreadyExists = await prisma.promocode.count({
      where: {
        userId: data.userId,
        code: data.code,
      }
    }) > 0;

    if (codeAlreadyExists) {
      return new Response(null, {
        status: 400,
        statusText: 'Code already exists for user'
      });
    }
  
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

  try {
    const updatedPromocode = await prisma.promocode.update({
      where: { id: parsedBody.id },
      data: { ...updateData }
    });
    return NextResponse.json(updatedPromocode.code);
  } catch (e) {
    return new Response(null, {
      status: 500,
      statusText: JSON.stringify(e),
    });
  }
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const parsedBody = IdSchema.parse(body);

  const { userId } = getAuth(req);

  if (!userId) {
    return new Response(null, {
      status: 401,
      statusText: 'Unauthorized request',
    });
  }

  let userCanDelete = false;

  try {
    userCanDelete = await prisma.promocode.count({
      where: {
        AND: [
          { userId: userId },
          { id: parsedBody.id }
        ]
      }
    }) === 1;
  } catch (e) {
    return new Response(null, {
      status: 500,
      statusText: 'Error checking if user could delete',
    });
  }

  if (!userCanDelete) {
    return new Response(null, {
      status: 401,
      statusText: 'User can only delete their own promocodes',
    });
  }

  try {
    const deletedPromocode = await prisma.promocode.delete({ where: { id: parsedBody.id } });
    return NextResponse.json(deletedPromocode.code);
  } catch (e) {
    return new Response(null, {
      status: 500,
      statusText: JSON.stringify(e),
    });
  }
}