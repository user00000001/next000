import { NextRequest, NextResponse } from "next/server";
import dayjs from "dayjs";
import path from "path";
import fs from "fs";
import { randomUUID } from "crypto";

const saveFile = async (blob: File): Promise<string> => {
    const saveDir = "/uploads/"+ dayjs().format("YYYY-MM-DD");
    const saveAbsDir = path.join(process.cwd(), 'public' + saveDir);
    fs.mkdirSync(saveAbsDir, {recursive: true});
    const fileName = randomUUID() + ".png";
    const arrayBuffer = await blob.arrayBuffer();
    fs.writeFileSync(saveAbsDir + "/" + fileName, new DataView(arrayBuffer));
    return saveDir + '/' + fileName;
};

export const POST = async (req: NextRequest) => {
    let file = (await req.formData()).get("file") as File;
    let fileName = await saveFile(file);
    return NextResponse.json({
        status: "",
        data: fileName,
    })
};