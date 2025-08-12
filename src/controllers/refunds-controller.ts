import { Request, Response } from "express"
import { z } from "zod"
import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/AppError"
import { hash } from "bcrypt"

const CategoriesEnum = z.enum([ "food", "others", "services", "transport", "accommodation" ])


class RefundsController {
    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            name: z.string().trim().min(1, { message: "Informe o nome da solicitação" }),
            category: CategoriesEnum,
            amount: z.number().positive({ message: "O número precisa ser positivo" }),
            filename: z.string().min(20, { message: "Deve conter pelo menos 20 caracteres" })
        })

        const { name, category, amount, filename } = bodySchema.parse(request.body)

        if(!request.user?.id) {
            throw new AppError("Não autorizado", 401)
        }

        const refund = await prisma.refunds.create({
            data: {
                name,
                category,
                amount,
                filename,
                userId: request.user.id
            }
        })

        response.status(201).json(refund)
    }

    async index(request: Request, response: Response) {
        response.json({ message: "ok" })
    }
}

export { RefundsController }