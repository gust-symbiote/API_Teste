import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TemaCrontoller } from "./controller/tema.controller";
import { Tema } from "./entities/tema.entity";
import { TemaService } from "./service/tema.service";

@Module({
    imports: [TypeOrmModule.forFeature([Tema])],
    providers: [TemaService],
    controllers:[TemaCrontoller],
    exports: [TypeOrmModule]
})
    export class TemaModule { }