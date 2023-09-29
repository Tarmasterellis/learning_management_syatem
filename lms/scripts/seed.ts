const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
    try {
        await database.category.createMany({
            data: [
                { name: "Logic Building and Basics" },
                { name: "Hyper Text Markup Language (HTML)" },
                { name: "Cascading Style Sheets (CSS) / Bootstrap (BS)" },
                { name: "Data Structures and Algorithms (DSA)" },
                { name: "Figma / Figjam" },
                { name: "Database Management System (DBMS)" },
                { name: "Ecma Script 6 (ES6) / Javascript (JS)" },
                { name: "Hyper Text Transfer Protocol (HTTP) and Application Programming Interface(API)" },
                { name: "GIT Client" },
                { name: "Angular" },
                { name: "Node JS" },
                { name: "CSharp" },
                { name: "IOS" },
                { name: "Android" },
                { name: "Docker" },
                { name: "Kubernetes" },
            ]
        });
        console.log("Data Seeding the database catogeries successful...!");
    }
    catch (error) { console.error("Error Seeding the database catogeries", error) }
    finally { await database.$disconnect(); }   
}

main();