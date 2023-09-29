import { db } from "@/lib/db";
import Mux from "@mux/mux-node";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const { Video } = new Mux (process.env.MUX_TOKEN_ID!, process.env.MUX_TOKEN_SECRET!);


export async function PATCH(req : Request, { params } : { params: { courseId: string; chapterId: string } }) {
    try
    {
        const { userId } = auth();

        if(!userId) {
            return new NextResponse("Unauthorized User, Please Register yourself and try again later...!", { status : 401 });
        }

        const courseOwner = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId,
            },
        });

        if(!courseOwner) {
            return new NextResponse("You are not the Owner of this course...!", { status : 401 });
        }

        const unpublishedChapter = await db.chapter.update({
            where : {
                id: params.chapterId,
                courseId: params.courseId,
            },
            data: {
                isPublished: false,
            },
        });

        const publishedChapterInCourse = await db.chapter.findMany({
            where: {
                courseId: params.courseId,
                isPublished: true,
            },
        });

        if(!publishedChapterInCourse.length) {
            await db.course.update({
                where: {
                    id: params.courseId,
                },
                data: {
                    isPublished: false,
                },
            });
        }

        return NextResponse.json(unpublishedChapter);
    }
    catch(error)
    {
        console.log("[Courses -> Individual Chapter -> unpublish -> [PATCH] Error] : <====>", error);
        return new NextResponse("Internal Error", { status : 500 });
    }
}