import { Router } from "express";
import OrphanagesController from "../controllers/orphanagesController";

const route = Router()

route.get('/orphanages', OrphanagesController.index)
route.get('/orphanages/:id')
route.post('/orphanages', OrphanagesController.create)

export default route
