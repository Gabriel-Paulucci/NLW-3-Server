import { Router } from "express";
import multer from "multer";
import controller from "../controllers/orphanagesController";
import uploadConfig from "../configs/uploads";

const upload = multer(uploadConfig)
const route = Router()

route.get('/orphanages', controller.index)
route.get('/orphanages/:id', controller.show)
route.post('/orphanages', upload.array('images'), controller.create)

export default route
