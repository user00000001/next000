import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest, { params }: any) => {
    const { id } = params;
    let data = await req.json();
    let res = await prisma.artical.update({
        where: {
            id,
        },
        data,
    })
    return NextResponse.json({
        status: res,
    });
};

export const DELETE = async (req: NextRequest, { params }: any) => {
    const { id } = params;
    let res = await prisma.artical.delete({
        where: {
            id,
        },
    })
    return NextResponse.json({
        status: res,
    });
};