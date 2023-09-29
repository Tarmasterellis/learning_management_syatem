"use client";

import { IconType } from "react-icons";
import { Category } from "@prisma/client";

import { MdOutlineHttp } from "react-icons/md";
import { CategoryItem } from "./category-item";
import { BiLogoKubernetes } from "react-icons/bi";
import { TbBrandGit, TbBrandFigma, TbBrandCSharp, TbBrandHtml5, TbBrandApple, TbBrandAngular, TbBrandNodejs, TbBrandAndroid, TbBrandJavascript, TbBrandDocker, TbBrain, TbDatabaseCog, TbBrandCss3, TbBinaryTree } from "react-icons/tb";

interface CategoriesProps {
    items: Category[];
};

const iconMap: Record<Category['name'], IconType> = {

    "GIT Client": TbBrandGit,
    "Figma / Figjam": TbBrandFigma,
    "CSharp": TbBrandCSharp,
    "Hyper Text Markup Language (HTML)": TbBrandHtml5,
    "IOS": TbBrandApple,
    "Angular": TbBrandAngular,
    "Node JS": TbBrandNodejs,
    "Android": TbBrandAndroid,
    "Ecma Script 6 (ES6) / Javascript (JS)": TbBrandJavascript,
    "Docker": TbBrandDocker,
    "Logic Building and Basics" : TbBrain,
    "Database Management System (DBMS)": TbDatabaseCog,
    "Hyper Text Transfer Protocol (HTTP) and Application Programming Interface(API)": MdOutlineHttp,
    "Cascading Style Sheets (CSS) / Bootstrap (BS)": TbBrandCss3,
    "Kubernetes": BiLogoKubernetes,
    "Data Structures and Algorithms (DSA)": TbBinaryTree,

}

export const Categories = ({ items } : CategoriesProps) => {
    return (
        <>
            <div className="flex item-center gap-x-2 overflow-x-auto pb-2">
                {
                    items.map((item) => (
                        <CategoryItem key={ item.id } label={ item.name } icon={ iconMap[item.name] } value={ item.id } />
                    ))
                }
            </div>
        </>
    )
}