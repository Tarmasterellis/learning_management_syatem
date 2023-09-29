"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { ConfirmModal } from "@/components/modals/confirm-modal";

interface CourseActionsProps {
    disabled: boolean;
    courseId: string;
    isPublished: boolean;
}

export const CourseActions = ({ disabled, courseId, isPublished } : CourseActionsProps) => {

    const router = useRouter();
    const confetti = useConfettiStore();
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try
        {
            setIsLoading(true);

            await axios.patch(`/api/courses/${courseId}/${isPublished ? "unpublish" : "publish"}`);

            toast.success(`Course was ${isPublished ? "Unpublish" : "Publish"} Successfully...!`);

            !isPublished ? confetti.onOpen() : confetti.onClose();

            router.refresh();
        }
        catch (error)
        {
            toast.error("Something Went Wrong While Publishing / Unpublishing the Course, Please Contact admin for Solution...!");
            console.log("Something Went Wrong While Publishing / Unpublishing the Course, Please Contact admin for Solution...!");
        }
        finally { setIsLoading(false); }
    }
    
    const onConfirm = async () => {
        try
        {
            setIsLoading(true);

            await axios.delete(`/api/courses/${courseId}`);

            toast.success("Course was deleted Successfully...!");

            router.refresh();
            router.push(`/teacher/courses`)
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
