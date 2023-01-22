import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";

@Entity({name: "tb_usuario"})
    export class Usuario{

        @PrimaryGeneratedColumn()
        @ApiProperty()
        id: number
        
        @IsNotEmpty()
        @Column({length: 255, nullable: false})
        @ApiProperty()
        nome: string

        @IsEmail()
        @IsNotEmpty()
        @Column({length: 255, nullable: false})
        @ApiProperty()
        usuario: string // email

        @IsNotEmpty()
        @MinLength(8)
        @Column({length: 255, nullable: false})
        @ApiProperty()
        senha: string

        @Column({length: 5000})
        @ApiProperty()
        foto: string

        @ApiProperty({ type: () => Postagem})
        @ManyToOne( () => Postagem, (postagem) => postagem.usuario)
        postagem: Postagem[]
}
