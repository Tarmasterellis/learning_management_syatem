import qs from "query-string";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { IconBadge } from "@/components/icon-badge";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface InfoCardProps {
    label: string;
    icon: LucideIcon;
    numberOfItems: number;
    variant?: "default" | "success";
};

export const InfoCard = ({ label, numberOfItems, variant, icon: Icon } : InfoCardProps) => {
    return (
        <>
            <div className="border rounded-md flex items-center gap-x-2 p-3">
                <IconBadge variant={ variant } icon={ Icon } />
                <div>
                    <p className="font-medium"> { label } </p>
                    <p className="text-gray-500 text-sm">{ numberOfItems + `${numberOfItems === 1 ? " Course" : " Courses"}` }</p>
                </div>
            </div>
        </>
    )
}