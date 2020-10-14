import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Orphanage } from "../database/models/orphanages";
import orphanagesView from "../views/orphanagesView";

export default {
    async index(req: Request, res: Response) {
        const rep = getRepository(Orphanage)

        const orphanages = await rep.find({
            relations: ['images']
        })

        return res.json(orphanagesView.renderMany(orphanages))
    },

    async show(req: Request, res: Response) {
        const rep = getRepository(Orphanage)

        const orphanage = await rep.findOneOrFail(req.params.id, {
            relations: ['images']
        })

        return res.json(orphanagesView.render(orphanage))
    },

    async create(req: Request, res: Response) {
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            openingHours,
            openOnWeekends
        } = req.body

        const reqImages = req.files as Express.Multer.File[]
        const images = reqImages.map(x => {
            return {
                path: x.filename
            }
        })

        const orphanage = {
            name: name,
            latitude: latitude,
            longitude: longitude,
            about: about,
            instructions: instructions,
            openingHours: openingHours,
            openOnWeekends: openOnWeekends,
            images: images
        } as Orphanage

        const rep = getRepository(Orphanage)

        await rep.save(orphanage)

        return res.status(201).json(orphanage)
    }
}