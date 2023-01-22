import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { Postagem } from "../entities/postagem.entity";


@Injectable()
export class PostagemService {
    constructor(
        @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem>
    ) { }

    async findAll(): Promise<Postagem[]> {
        return await this.postagemRepository.find();
    }

    async findOneById(id: number): Promise<Postagem> {

        let post = await this.postagemRepository.findOne({
            where: {
                id
            }
        });

        if (!post)
            throw new HttpException('Usuario não existe', HttpStatus.BAD_REQUEST);

        return post;
    }

    async findOneByTitulo(titulo: string): Promise<Postagem[]> {
        return await this.postagemRepository.find({
            where: {
                titulo: Like(`%${titulo}%`)
            }
        })
    }

    async create(postagem: Postagem): Promise<Postagem> {
        return await this.postagemRepository.save(postagem);
    }

    async update(postagem: Postagem): Promise<Postagem> {
        let post = this.findOneById(postagem.id);
        return await this.postagemRepository.save(postagem);
    }

    async remove(id: number): Promise<void> {
        let post = this.findOneById(id);
        await this.postagemRepository.delete(id);
    }
}