import express, { Router } from "express";
import { join } from "path";

const route = Router()

route.use('/uploads', express.static(join(__dirname, '..', 'uploads')))

export default route