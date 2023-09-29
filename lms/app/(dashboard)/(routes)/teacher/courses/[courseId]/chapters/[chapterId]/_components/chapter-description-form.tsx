"use client";

import axios from "axios";
import * as zod from "zod";
// import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { Chapter } from "@prisma/client";
import { Pencil, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Editor } from "@/components/editor";
import { Preview } from "@/components/preview";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormMessage, FormItem } from "@/components/ui/form";

const formSchema = zod.object({
    description: zod.string().min(1),
});

interface ChapterDescriptionFormProps {
    initialData: Chapter;
    courseId: string;
    chapterId: string
}

export const ChapterDescriptionForm = ({
    initialData,
    courseId,
    chapterId,
} : ChapterDescriptionFormProps) => {

    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const form = useForm<zod.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: initialData?.description || ""
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: zod.infer<typeof formSchema>) => {
        try {
            const response = await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
            toast.success("Chapter Details Updated Successfully...!");
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
                    Chapter Description
                    <Button variant="ghost" onClick={ toggleEdit }>
                        { isEditing && (<> <X className="h-4 w-4 mr-2" /> Cancel </>) }
                        { !isEditing && (<> <Pencil className="h-4 w-4 mr-2" /> Edit Description </> )}
                    </Button>
                </div>
                {
                    !isEditing && (
                        <>
                            <div className={ cn( "text-sm mt-2", !initialData.description && "text-slate-500 italic") }>{ initialData.description ? ( <Preview value={ initialData.description } /> ) : "No Description" }</div>
                        </>
                    )
                }
                {
                    isEditing && (
                        <>
                            <Form {...form}>
                                <form onSubmit={ form.handleSubmit(onSubmit) } className="space-y-4 mt-4">
                                    <FormField control={ form.control } name="description" render={ ({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Editor {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <div className="flex items-center gap-x-2">
                                        <Button disabled={ !isValid || isSubmitting } type="submit">Save</Button>
                                    </div>
                                </form>
                            </Form>
                        </>
                    )
                }
            </div>
        </>
    )
}