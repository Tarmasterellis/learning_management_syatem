"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import axios from "axios";

interface CourseProgressButtonProps {
    courseId: string
    chapterId: string
    nextChapterId?: string
    isCompleted?: boolean
}

export const CourseProgressButton = ({ courseId, chapterId, nextChapterId, isCompleted } : CourseProgressButtonProps) => {

    const router = useRouter();
    const confetti = useConfettiStore();
    const Icon = isCompleted ? XCircle : CheckCircle;

    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {

        try
        {
            setIsLoading(true);

            await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`,
            {
                isCompleted: !isCompleted
            });

            if(!isCompleted && !nextChapterId) confetti.onOpen(); 

            if(!isCompleted && nextChapterId) router.push(`/courses/${courseId}/chapters/${nextChapterId}`)

            toast.success("Progress Updated Successfully...!");
            router.refresh();

        }
        catch (error)
        {
            toast.error("Something Went Wrong While Completing the Chapter, please contact admin for solution...!");
        }
        finally { setIsLoading(false); }
    }

    return (
        <>
            <Button onClick={ onClick } disabled={ isLoading } type="button" variant={ isCompleted ? "outline" : "success" } className="w-full md:w-auto">
                { isCompleted ? "Not Completed" : "Mark as Completed" }
                <Icon className="h-4 w-4 ml-2" />
            </Button>
        </>
    )
}