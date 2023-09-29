"use client";

import axios from "axios";
import * as zod from "zod";
// import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Loader2, PlusCircle, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Chapter, Course } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormMessage, FormItem } from "@/components/ui/form";
import { ChapterList } from "./chapter-list";

const formSchema = zod.object({
    title: zod.string().min(1),
});

interface ChaptersFormProps {
    initialData: Course & { chapters: Chapter[] };
    courseId: string;
}

export const ChaptersForm = ({
    initialData,
    courseId
} : ChaptersFormProps) => {

    const [isCreating, setIsCreating] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const toggleCreating = () => {
        setIsCreating((current) => !current)
    };

    const router = useRouter();

    const form = useForm<zod.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: zod.infer<typeof formSchema>) => {
        try {
            const response = await axios.post(`/api/courses/${courseId}/chapters`, values);
            toast.success("Course Chapters Added Successfully...!");
            toggleCreating();
            router.refresh();
        } catch
        {
            toast.error("Something Went Wrong, Please Contact Admin for Solution...!");
            console.log("Something Went Wrong, Please Contact Admin for Solution...!");
        }
    }

    const onReorder = async (updateData: { id: string; position: number }[]) => {
        try {
            setIsUpdating(true);
            const response = await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
                list: updateData
            });
            toast.success("Course Chapters Updated Successfully...!");
            router.refresh();
        } catch (error) {
            toast.error("Something Went Wrong, Please Contact Admin for Solution...!");
            console.log("Something Went Wrong, Please Contact Admin for Solution...!");
        } finally { setIsUpdating(false); }
    };

    const onEdit = (id: string) => {
        router.push(`/teacher/courses/${courseId}/chapters/${id}`);
    };

    return (
        <>
            <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
                {
                    isUpdating && (
                        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
                            <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
                        </div>
                    )
                }
                <div className="font-medium flex items-center justify-between">
                    Course Chapters
                    <Button variant="ghost" onClick={ toggleCreating }>
                        {
                            isCreating
                            ?
                                (<> <X className="h-4 w-4 mr-2" /> Cancel </>)
                            :
                                (<> <PlusCircle className="h-4 w-4 mr-2" /> Add A Chapters </> )
                        }
                    </Button>
                </div>
                {
                    isCreating && (
                        <>
                            <Form {...form}>
                                <form onSubmit={ form.handleSubmit(onSubmit) } className="space-y-4 mt-4">
                                    <FormField control={ form.control } name="title" render={ ({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input disabled={ isSubmitting } placeholder="Introduction to the course...! " {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <Button disabled={ !isValid || isSubmitting } type="submit">Create</Button>
                                </form>
                            </Form>
                        </>
                    )
                }
                {
                    !isCreating && (
                        <>
                            <div className={ cn( "text-sm mt-2", !initialData.chapters.length && "text-slate-500 italic" ) }>
                                { !initialData.chapters.length && "No Chapters added Yet...!" }
                                <ChapterList onEdit={onEdit} onReorder={onReorder} items={initialData.chapters || []} />
                            </div>
                        </>
                    )
                }
                {
                    !isCreating && (
                        <>
                            <p className="text-xs text-muted-foreground mt-4">
                                Drag and Drop to reorder the chapters...!
                            </p>
                        </>
                    )
                }
            </div>
        </>
    )
}