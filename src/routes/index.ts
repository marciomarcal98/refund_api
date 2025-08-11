import { Router } from "express"

import { usersRoutes } from "./users-routes"
import { sessionsRoutes } from "./sessions-routes"
import { refundsRoutes } from "./refunds-routes"

import { ensureAuthenticated } from "@/middlewares/ensure-authenticated"

const routes = Router()

// rotas públicas
routes.use("/users", usersRoutes)
routes.use("/sessions", sessionsRoutes)

// rotas privadas
routes.use(ensureAuthenticated)
routes.use("/refunds", refundsRoutes)

export { routes }