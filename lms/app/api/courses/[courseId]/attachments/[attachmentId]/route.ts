import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(req : Request, { params }: { params: { courseId: string, attachmentId: string } }) {
    try
    {
        const { userId } = auth();

        if(!userId) {
            return new NextResponse("Unauthorized User, Please Register yourself and try again later...!", { status : 401 });
        }

        const courseOwner = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId,
            }
        });

        if(!courseOwner) {
            return new NextResponse("You are not the Owner of this course...!", { status : 401 });
        }

        const attachment = await db.attachment.delete({
            where: {
                courseId: params.courseId,
                id: params.attachmentId,
            }
        });

        return NextResponse.json(attachment);
    }
    catch(error)
    {
        console.log("[Courses Attachment Deleting Error] : <====>", error);
        return new NextResponse("Internal Error", { status : 500 });
    }
}