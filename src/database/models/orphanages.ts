import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Image } from "./images"

@Entity('orphanages')
export class Orphanage {
    @PrimaryGeneratedColumn('increment')
    id!: number
    @Column()
    name!: string
    @Column()
    latitude!: number
    @Column()
    longitude!: number
    @Column()
    about!: string
    @Column()
    instructions!: string
    @Column()
    openingHours!: string
    @Column()
    openOnWeekends!: string
    @OneToMany(() => Image, x => x.orphanageId, {
        cascade: [
            'insert', 
            'update'
        ]
    })
    images!: Image[]
}
