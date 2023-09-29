"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { SearchInput } from "./search-input";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export const NavbarRoutes = () => {

    const pathName = usePathname();

    const isTeacherPage = pathName?.startsWith("/teacher");
    const isPlayerPage = pathName?.includes("/chapter");
    const isSearchPage = pathName === "/search";

    return (
        <>
            {
                isSearchPage && (
                    <div className="hidden md:block">
                        <SearchInput />
                    </div>
                )
            }
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