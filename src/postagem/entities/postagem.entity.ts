import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { ApiProperty } from '@nestjs/swagger';
import { Usuario } from "../../usuario/entities/usuario.entity";
import { Tema } from "../../tema/entities/tema.entity";

@Entity({})
export class Postagem {

    @PrimaryGeneratedColumn() 
    @ApiProperty()     
    id: number

    @Column({length: 30, nullable: false})
    @ApiProperty()  
    titulo: string

    @Column({length: 5000, nullable: false})
    @ApiProperty()  
    texto: string

    @ManyToOne(() => Tema, (tema) => tema.postagem)
    @ApiProperty()  
    tema: Tema //Documentação: https://typeorm.io/many-to-one-one-to-many-relations

    @ManyToOne(() => Usuario, (usuario) => usuario.postagem)
    @ApiProperty()  
    usuario: Usuario //Documentação: https://typeorm.io/many-to-one-one-to-many-relations
}
