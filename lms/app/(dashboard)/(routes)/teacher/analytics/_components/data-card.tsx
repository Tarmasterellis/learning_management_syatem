import { LucideIcon } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconBadge } from "@/components/icon-badge";

interface DataCardProps {
    value: number;
    label: string;
    shouldFormat?: boolean;
    icon: LucideIcon;
    variant?: "default" | "success";
}

export const DataCard = ({ value, label, shouldFormat, icon: Icon, variant } : DataCardProps) => {
    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <IconBadge variant={ variant } icon={ Icon } />
                    <CardTitle className="text-sm font-medium"> { label } </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-end">
                    <div className="text-2xl font-bold">
                        { shouldFormat ? formatPrice(value) : value }
                    </div>
                </CardContent>
            </Card>
        </>
    )
}