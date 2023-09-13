import { NextRequest, NextResponse } from "next/server";

export const POST = (req: NextRequest) => {
    return NextResponse.json({
        success: true,
    }, {
        headers: {
            "Set-Cookie": "admin-token=123;Path=/"
        }
    })
}