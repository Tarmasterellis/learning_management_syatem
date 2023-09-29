"use client";

import axios from "axios";
import * as zod from "zod";
// import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { Course } from "@prisma/client";
import { Pencil, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormLabel, FormMessage, FormItem } from "@/components/ui/form";
import { Combobox } from "@/components/ui/combobox";

const formSchema = zod.object({
    categoryId: zod.string().min(1),
});

interface CategoryFormProps {
    initialData: Course;
    courseId: string;
    options: { label: string; value: string; }[];
}

export const CategoryForm = ({
    initialData,
    courseId,
    options,
} : CategoryFormProps) => {

    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const form = useForm<zod.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            categoryId: initialData?.categoryId || ""
        },
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

    const selectedOption = options.find((option) => option.value === initialData.categoryId);

    return (
        <>
            <div className="mt-6 border bg-slate-100 rounded-md p-4">
                <div className="font-medium flex items-center justify-between">
                    Course Category
                    <Button variant="ghost" onClick={ toggleEdit }>
                        { isEditing && (<> <X className="h-4 w-4 mr-2" /> Cancel </>) }
                        { !isEditing && (<> <Pencil className="h-4 w-4 mr-2" /> Edit Category </> )}
                    </Button>
                </div>
                {
                    !isEditing && (
                        <>
                            <p className={ cn( "text-sm mt-2", !initialData.categoryId && "text-slate-500 italic") }>{ selectedOption?.label || "No category found." }</p>
                        </>
                    )
                }
                {
                    isEditing && (
                        <>
                            <Form {...form}>
                                <form onSubmit={ form.handleSubmit(onSubmit) } className="space-y-4 mt-4">
                                    <FormField control={ form.control } name="categoryId" render={ ({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Combobox options={...options} {...field} />
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