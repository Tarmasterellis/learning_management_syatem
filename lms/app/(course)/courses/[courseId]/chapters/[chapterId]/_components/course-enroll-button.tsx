"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";

interface CourseEnrollButtonProps {
    courseId: string;
    price: number;
}

export const CourseEnrollButton = ({ courseId, price } : CourseEnrollButtonProps) => {

    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try
        {
            setIsLoading(true);

            const response = await axios.post(`/api/courses/${courseId}/checkout`);
            window.location.assign(response.data.url);

        }
        catch (error)
        {
            toast.error("Something Went Wrong While getting you Enrolled to the course, please contact admin for solution...!");
        }
        finally { setIsLoading(false); }
    }

    return (
        <>
            <Button className="w-full md:w-auto" onClick={ onClick } disabled={ isLoading }> Enroll For { formatPrice(price) } </Button>
        </>
    )
}