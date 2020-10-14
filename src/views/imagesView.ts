import { Image } from "../database/models/images"

export default {
    render(image: Image) {
        return {
            id: image.id,
            url: 'http://localhost:5000/uploads/' + image.path 
        }
    },
    renderMany(images: Image[]) {
        return images.map(x => this.render(x))
    }
}
