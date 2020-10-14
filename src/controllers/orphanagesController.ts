import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Orphanage } from "../database/models/orphanages";
import orphanagesView from "../views/orphanagesView";
import * as Yup from "yup";

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

        const scheme = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            openingHours: Yup.string().required(),
            openOnWeekends: Yup.string().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                })
            )
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
        }

        scheme.validate(orphanage, {
            abortEarly: false
        })

        const rep = getRepository(Orphanage)

        await rep.save(orphanage)

        return res.status(201).json(orphanage)
    }
}