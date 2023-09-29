"use client";

import axios from "axios";
import * as zod from "zod";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import MuxPlayer from "@mux/mux-player-react";
import { Button } from "@/components/ui/button";
import { Chapter, MuxData } from "@prisma/client";
import { FileUpload } from "@/components/ui/file-upload";
import { Pencil, PlusCircle, Video, X } from "lucide-react";


const formSchema = zod.object({
    videoUrl: zod.string().min(1),
});

interface ChapterVideoFormProps {
    initialData: Chapter & { muxData?: MuxData | null };
    courseId: string;
    chapterId: string
}

export const ChapterVideoForm = ({
    initialData,
    courseId,
    chapterId,
} : ChapterVideoFormProps) => {

    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const onSubmit = async (values: zod.infer<typeof formSchema>) => {
        try {
            const response = await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
            toast.success("Chapter Video Uploaded Successfully...!");
            toggleEdit();
            router.refresh();
        } catch
        {
            toast.error("Something Went Wrong, Please Contact Admin for Solution...!");
            console.log("Something Went Wrong, Please Contact Admin for Solution...!");
        }
    }

    return (
        <>
            <div className="mt-6 border bg-slate-100 rounded-md p-4">
                <div className="font-medium flex items-center justify-between">
                    Chapter Video
                    <Button variant="ghost" onClick={ toggleEdit }>
                        { isEditing && (<> <X className="h-4 w-4 mr-2" /> Cancel </>) }
                        { !isEditing && !initialData.videoUrl && (<> <PlusCircle className="h-4 w-4 mr-2" /> Add A Video </>) }
                        { !isEditing && initialData.videoUrl && (<> <Pencil className="h-4 w-4 mr-2" /> Edit Video </> )}
                    </Button>
                </div>
                {
                    !isEditing && (
                        <>
                            {
                                !initialData.videoUrl ? (
                                        <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                                            <Video className="h-10 w-10 text-slate-500" />
                                        </div>
                                ) : (
                                    <div className="relative aspect-video mt-2">
                                        <MuxPlayer playbackId={ initialData?.muxData?.playbackId || "" } />
                                        {/* { Implement free video streaming and free video storing here } */}
                                    </div>
                                )
                            }
                        </>
                    )
                }
                {
                    isEditing && (
                        <>
                            <div>
                                <FileUpload endpoint="chapterVideo" onChange={(url) => { if(url) { onSubmit({ videoUrl: url }) } }} />
                                <div className="text-xs text-mutes-foreground mt-4">
                                    Upload This Chapter&apos;s Video
                                </div>
                            </div>
                        </>
                    )
                }
                {
                    initialData.videoUrl && !isEditing && (
                        <>
                            <div className="text-xs text-muted-foreground mt-2">
                                Videos can take a few minutes to process. Refresh the page if the video does not appear.
                            </div>
                        </>
                    )
                }
            </div>
        </>
    )
}