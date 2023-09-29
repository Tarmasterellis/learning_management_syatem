"use client";

import axios from "axios";
import * as zod from "zod";
import Link from "next/link";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormLabel, FormMessage, FormItem } from "@/components/ui/form";

const formSchema = zod.object({
    title: zod.string().min(1, { message: "Title is Required...!" }),
});

const CreatePage = () => {

    const router = useRouter();

    const form = useForm<zod.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ""
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: zod.infer<typeof formSchema>) => {
        try {
            const response = await axios.post("/api/courses", values);
            router.push(`/teacher/courses/${response.data.id}`);
            toast.success("Course Created Successfully...!");
        } catch
        {
            toast.error("Something Went Wrong, Please Contact Admin for Solution...!");
            console.log("Something Went Wrong, Please Contact Admin for Solution...!");
        }
    }

    return (
        <>
            <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
                <div>
                    <h1 className="text-2xl">Name of the Course</h1>
                    <p className="text-xs text-slate-600">What would you like to name your course? Don&apos;t worry, you can change this later...!</p>
                    <Form {...form}>
                        <form onSubmit={ form.handleSubmit(onSubmit) } className="space-y-8 mt-8">
                            <FormField control={ form.control } name="title" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Course Title</FormLabel>
                                    <FormControl>
                                        <Input disabled = { isSubmitting } placeholder="e.g. 'Logic Building' or 'OOPS Concepts' " {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        What will be taught in this Course...?
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <div className="flex items-center gap-x-2">
                                <Link href='/'>
                                    <Button type="button" variant="ghost">Cancel</Button>
                                </Link>
                                <Button type="submit" disabled={ !isValid || isSubmitting }>Continue</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </>
    );
}
 
export default CreatePage;