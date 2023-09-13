import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest ): Promise<NextResponse> => {
    const size = (req.nextUrl.searchParams.get("size") as any * 1) || 5;
    const start = (req.nextUrl.searchParams.get("start") as any * 1) || 0;
    const title = (req.nextUrl.searchParams.get("title") as string) || "";
    let datas = await prisma.artical.findMany({
        where: {
            title: {
                contains: title,
            },
        },
        skip: start * size,
        take: size,
    });
    let total = await prisma.artical.count({
        where: {
            title: {
                contains: title,
            }
        }
    });
    return NextResponse.json({
        data: datas,
        total,
    })
};

export const POST = async (req: NextRequest): Promise<NextResponse> => {
    let data = await req.json();
    let res = await prisma.artical.create({
        data,
    })
    return NextResponse.json({
        status: res,
    })
};