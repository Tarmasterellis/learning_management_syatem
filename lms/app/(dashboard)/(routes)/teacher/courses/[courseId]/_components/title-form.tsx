"use client";

import axios from "axios";
import * as zod from "zod";
// import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { Pencil, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormLabel, FormMessage, FormItem } from "@/components/ui/form";

const formSchema = zod.object({
    title: zod.string().min(1, { message: "Title is Required...!" }),
});

interface TitleFormProps {
    initialData: {
        title: string;
    };
    courseId: string;
}

export const TitleForm = ({
    initialData,
    courseId
} : TitleFormProps) => {

    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const form = useForm<zod.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: zod.infer<typeof formSchema>) => {
        try {
            const response = await axios.patch(`/api/courses/${courseId}`, values);
            toast.success("Course Updated Successfully...!");
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
                    Course Title
                    <Button variant="ghost" onClick={ toggleEdit }>
                        { isEditing && (<> <X className="h-4 w-4 mr-2" /> Cancel </>) }
                        { !isEditing && (<> <Pencil className="h-4 w-4 mr-2" /> Edit Title </> )}
                    </Button>
                </div>
                {
                    !isEditing && (
                        <>
                            <p className="text-sm mt-2">{ initialData.title }</p>
                        </>
                    )
                }
                {
                    isEditing && (
                        <>
                            <Form {...form}>
                                <form onSubmit={ form.handleSubmit(onSubmit) } className="space-y-4 mt-4">
                                    <FormField control={ form.control } name="title" render={ ({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input disabled={ isSubmitting } placeholder="e.g. 'Logic Building' or 'OOPS Concepts' " {...field} />
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