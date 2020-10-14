import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Orphanage } from "./orphanages"

@Entity('images')
export class Image {
    @PrimaryGeneratedColumn('increment')
    id!: number
    @Column()
    path!: string
    @Column()
    orphanageId!: number
    @ManyToOne(() => Orphanage, x => x.images)
    orphanage!: Orphanage
}
