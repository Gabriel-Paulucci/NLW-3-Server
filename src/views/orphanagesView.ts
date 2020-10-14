import { Orphanage } from "../database/models/orphanages"

export default {
    render(orphanage: Orphanage) {
        return {
            id: orphanage.id,
            name: orphanage.name,
            latitude: orphanage.latitude,
            longitude: orphanage.longitude,
            about: orphanage.about,
            instructions: orphanage.instructions,
            openingHours: orphanage.openingHours,
            openOnWeekends: orphanage.openOnWeekends
        }
    },
    renderMany(orphanages: Orphanage[]) {
        return orphanages.map(x => this.render(x))
    }
}
