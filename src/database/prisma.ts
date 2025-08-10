import { PrismaClient } from "@prisma/client"

// caso queira ver algun dado de consulta
export const prisma = new PrismaClient({
    log: ["query"],
})