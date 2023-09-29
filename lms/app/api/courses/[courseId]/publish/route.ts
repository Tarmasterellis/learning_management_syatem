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
            include: {
                chapters: {
                    include: {
                        muxData: true,
                    },
                },
            },
        });

        if(!course) {
            return new NextResponse("You May have taken the wrong turn, The Course you are looking for does not exists...!", { status : 404 });
        }

        const hasPublishedChapters = course.chapters.some((chapter) => chapter.isPublished);

        if(!course.title || !course.description || !course.imageUrl || !course.categoryId || !hasPublishedChapters) {
            return new NextResponse("You are missing some required fields, Please add them before you publish the chapter...!", { status : 401 });
        }

        const publishedCourse = await db.course.update({
            where: {
                id: params.courseId,
                userId,
            },
            data: {
                isPublished: true,
            },
        })

        return NextResponse.json(publishedCourse);
    }
    catch(error)
    {
        console.log("[Courses -> publish -> [PATCH] Error] : <====>", error);
        return new NextResponse("Internal Error", { status : 500 });
    }
}