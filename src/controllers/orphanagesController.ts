import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Orphanage } from "../database/models/orphanages";

export default {
    async index(req: Request, res: Response) {
        const rep = getRepository(Orphanage)

        const orphanages = rep.find()

        return res.json(orphanages)
    },

    async show(req: Request, res: Response) {
        const rep = getRepository(Orphanage)

        const orphanages = rep.findOneOrFail(req.params.id)

        return res.json(orphanages)
    },

    async create(req: Request, res: Response) {
        const orphanage = req.body as Orphanage

        const rep = getRepository(Orphanage)

        await rep.save(orphanage)

        return res.status(201).json(orphanage)
    }
}