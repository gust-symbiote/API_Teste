import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { Tema } from "../entities/tema.entity";

@Injectable()
export class TemaService {

    constructor(
        @InjectRepository(Tema)
        private temaRepository: Repository<Tema>
    ) { }

    async findAll(): Promise<Tema[]> {
        return await this.temaRepository.find({
            //Documentação: https://typeorm.io/many-to-one-one-to-many-relations
            relations: {
                postagem: true
            }
        });
    }

    async findOneById(id: number): Promise<Tema> {
        let tema = await this.temaRepository.findOne({
            where: {
                id
            },
            //Documentação: https://typeorm.io/many-to-one-one-to-many-relations
            relations: {
                postagem: true
            }
        });

        if (!tema)
            throw new HttpException('Tema não existe', HttpStatus.BAD_REQUEST);

        return tema;
    }

    async findOneByDescricao(descricao: string): Promise<Tema[]> {
        return await this.temaRepository.find({
            where: {
                descricao: Like(`%${descricao}%`),
            },
            relations: {
                postagem: true
            }
        })
    }

    async create(tema: Tema): Promise<Tema> {
        return await this.temaRepository.save(tema);
    }

    async update(tema: Tema): Promise<Tema> {
        let post = this.findOneById(tema.id);
        return await this.temaRepository.save(tema);
    }

    async remove(id: number): Promise<void> {
        let post = this.findOneById(id);
        await this.temaRepository.delete(id);
    }

}