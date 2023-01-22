import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Postagem } from "src/postagem/entities/postagem.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "tb_temas"})
export class Tema {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @IsNotEmpty()
    @Column({length: 50, nullable: false})
    @ApiProperty()
    assunto: string

    @IsNotEmpty()
    @Column({length: 255, nullable:false})
    @ApiProperty()
    descricao: string

    @ApiProperty({ type: () => Postagem })
    @OneToMany(() => Postagem, (postagem) => postagem.tema)
    @JoinColumn({})
    postagem: Postagem  

}
