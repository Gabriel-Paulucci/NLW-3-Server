import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

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
}
