"use client";

import axios from "axios";
import * as zod from "zod";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { Course } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import { ImageIcon, Pencil, PlusCircle, X } from "lucide-react";

const formSchema = zod.object({
    imageUrl: zod.string().min(1, { message: "Image is Required...!" }),
});

interface ImageFormProps {
    initialData: Course;
    courseId: string;
}

export const ImageForm = ({
    initialData,
    courseId
} : ImageFormProps) => {

    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

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
                    Course Image
                    <Button variant="ghost" onClick={ toggleEdit }>
                        { isEditing && (<> <X className="h-4 w-4 mr-2" /> Cancel </>) }
                        { !isEditing && !initialData.imageUrl && (<> <PlusCircle className="h-4 w-4 mr-2" /> Add Image </>) }
                        { !isEditing && initialData.imageUrl && (<> <Pencil className="h-4 w-4 mr-2" /> Edit Image </> )}
                    </Button>
                </div>
                {
                    !isEditing && (
                        <>
                            {
                                !initialData.imageUrl ? (
                                        <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                                            <ImageIcon className="h-10 w-10 text-slate-500" />
                                        </div>
                                ) : (
                                    <div className="relative aspect-video mt-2">
                                        <Image src={ initialData.imageUrl } alt="Uploading user files section" fill className="object-cover rounded-md" />
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
                                <FileUpload endpoint="courseImage" onChange={(url) => { if(url) { onSubmit({ imageUrl: url }) } }} />
                                <div className="text-xs text-mutes-foreground mt-4">
                                    16:9 aspect ration recommended
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </>
    )
}