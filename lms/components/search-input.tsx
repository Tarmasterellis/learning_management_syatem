"use client";

import qs from "query-string";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export const SearchInput = () => {

    const [value, setValue] = useState("");
    const debounceValue = useDebounce(value);

    const pathName = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentCategoryId = searchParams.get("categoryId");

    useEffect(() => {
        const url = qs.stringifyUrl(
            {
                url: pathName,
                query: {
                    categoryId: currentCategoryId,
                    title: debounceValue,
                },
            }, { skipEmptyString: true, skipNull: true }
        );

        router.push(url);
    }, [pathName, currentCategoryId, debounceValue, router])

    return (
        <>
            <div className="relative">
                <Search className="h-4 w-4 absolute top-3 left-3 text-slate-600" />
                <Input value={ value } onChange={ (event) => setValue(event.target.value) } className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200" placeholder="Search for a Course...!" />
            </div>
        </>
    )
}