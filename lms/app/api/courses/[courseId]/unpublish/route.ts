import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req : Request, { params } : { params: { courseId: string } }) {
    try
    {
        const { userId } = auth();

        if(!userId) {
            return new NextResponse("Unauthorized User, Please Register yourself and try again later...!", { status : 401 });
        }

        const course = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId,
            },
        });

        if(!course) {
            return new NextResponse("You May have taken the wrong turn, The Course you are looking for does not exists...!", { status : 404 });
        }

        const unpublishedCourse = await db.course.update({
            where: {
                id: params.courseId,
                userId,
            },
            data: {
                isPublished: false,
            },
        })

        return NextResponse.json(unpublishedCourse);
    }
    catch(error)
    {
        console.log("[Courses -> unpublish -> [PATCH] Error] : <====>", error);
        return new NextResponse("Internal Error", { status : 500 });
    }
}