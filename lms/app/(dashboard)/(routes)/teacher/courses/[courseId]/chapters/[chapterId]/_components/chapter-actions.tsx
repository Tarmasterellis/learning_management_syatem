"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";

interface ChapterActionsProps {
    disabled: boolean;
    courseId: string;
    chapterId: string;
    isPublished: boolean;
}

export const ChapterActions = ({ disabled, courseId, chapterId, isPublished } : ChapterActionsProps) => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try
        {
            setIsLoading(true);

            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/${isPublished ? "unpublish" : "publish"}`);

            toast.success(`Chapter was ${isPublished ? "Unpublish" : "Publish"} Successfully...!`);

            router.refresh();
        }
        catch (error)
        {
            toast.error("Something Went Wrong While Publishing / Unpublishing the Chapter, Please Contact admin for Solution...!");
            console.log("Something Went Wrong While Publishing / Unpublishing the Chapter, Please Contact admin for Solution...!");
        }
        finally { setIsLoading(false); }
    }
    
    const onConfirm = async () => {
        try
        {
            setIsLoading(true);

            await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);

            toast.success("Chapter was deleted Successfully...!");

            router.refresh();
            router.push(`/teacher/courses/${courseId}`)
        }
        catch (error)
        {
            toast.error("Something Went Wrong While Deleting, Please Contact admin for Solution...!");
            console.log("Something Went Wrong While Deleting, Please Contact admin for Solution...!");
        }
        finally { setIsLoading(false); }
    }

    return (
        <>
            <div className="flex items-center gap-x-2">
                <Button onClick={ onClick } disabled={ disabled || isLoading } variant="outline" size="sm">
                    {
                        `${ isPublished ? "Unpublish" : "Publish" }...!`
                    }
                </Button>
                <ConfirmModal onConfirm={ onConfirm }>
                    <Button size="sm" disabled={ isLoading }>
                        <Trash className="h-4 w-4" />
                    </Button>
                </ConfirmModal>
            </div>
        </>
    );
}
