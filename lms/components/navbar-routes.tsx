"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export const NavbarRoutes = () => {

    const pathName = usePathname();

    const isTeacherPage = pathName?.startsWith("/teacher");
    const isPlayerPage = pathName?.includes("/chapter");



    return (
        <>
            <div className="flex gap-x-2 ml-auto">
                {
                    isTeacherPage || isPlayerPage ? (
                        <Link href="/">
                            <Button size="sm" variant="ghost">
                                <LogOut className="h-4 w-4 mr-2" />
                                Exit
                            </Button>
                        </Link>
                    ) : (
                        <Link href="/teacher/courses">
                            <Button size="sm" variant="ghost">
                                Teacher Mode
                            </Button>
                        </Link>
                    )
                }
                <UserButton afterSignOutUrl="/" />
            </div>
        </>
    )
}