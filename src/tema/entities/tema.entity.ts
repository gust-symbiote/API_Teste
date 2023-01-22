import { Postagem } from "src/Postagem/entities/postagem.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Tema {

    @PrimaryGeneratedColumn()
    @ApiProperty()    
    id: number

    @Column({length: 30, nullable: false})
    @ApiProperty()  
    descricao: string

    @OneToMany(() => Postagem, (postagem) => postagem.tema)
    @ApiProperty()  
    postagem: Postagem[]  //Documentação: https://typeorm.io/many-to-one-one-to-many-relations
}