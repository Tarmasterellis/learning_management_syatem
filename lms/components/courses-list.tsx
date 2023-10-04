import { CourseCard } from "./course-card";
import { Category, Course } from "@prisma/client";

type CourseWithProgressWithCategory = Course & {
    category: Category | null;
    chapters: { id: string }[];
    progress: number | null;
};

interface CoursesListProps {
    items: CourseWithProgressWithCategory[],
}

export const CourseList = ({ items } : CoursesListProps) => {
    return (
        <>
            <div>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
                    {
                        items.map((item) => (
                            <>
                                <div key={ item.id }>
                                    {/* { item.title } */}
                                    <CourseCard key={ item.id } id={ item.id } title={ item.title } imageUrl={ item.imageUrl! } chaptersLength={ item.chapters.length } price={ item.price! } progress={ item.progress } category={ item?.category?.name! } />
                                </div>
                            </>
                        ))
                    }
                </div>
                <div>
                    {
                        items.length === 0 && (
                            <>
                                <div className="text-center text-sm text-muted-foreground mt-10">
                                    No Courses Found...!
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </>
    )
}
