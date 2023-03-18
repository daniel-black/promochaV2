import { getAuth } from "@clerk/nextjs/server";
import { PromocodePageParams } from "../page";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest, { params }: PromocodePageParams) {
  const { userId } = getAuth(req);
  if (!userId) {
    return new Response(null, {
      status: 401
    });
  }

  const promocode = await prisma.promocode.findFirst({
    where: {
      code: params.code,
      userId,
    }
  });

  console.log({promocode})

  return new Response(JSON.stringify(promocode), {status:200})
}