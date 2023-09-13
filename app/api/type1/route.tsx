import { createSamples, getAll } from "@/services/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    // return NextResponse.json({});
    return NextResponse.json(await getAll());
};
export const POST = async (req: NextRequest) => {
    // return NextResponse.json({});
    return NextResponse.json(await createSamples());
};