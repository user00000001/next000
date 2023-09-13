import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
    let data = await prisma.goods.findMany({
        orderBy: {
            createAt: 'desc',
        }
    });
    return NextResponse.json({
        data
    })
}

export const POST = async (req: NextRequest): Promise<NextResponse> => {
    let data = await prisma.goods.create({
        data: await req.json(),
    });
    return NextResponse.json({
        data
    })
}