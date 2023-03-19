import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: { code: string } }) {
  console.log(params)

  return NextResponse.json({msg: 'ahoy'});
}