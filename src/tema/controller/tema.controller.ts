import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from "@nestjs/common";
import { Tema } from "../entities/tema.entity";
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TemaService } from "../service/tema.service";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";

@ApiBearerAuth()
@ApiTags('Tema')
@Controller("/tema")
@UseGuards(JwtAuthGuard)
export class TemaController {
  constructor(private readonly service: TemaService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Tema[]> {
    return this.service.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id') id: number): Promise<Tema> {
    return this.service.findOneById(id);
  }

  @Get('/descricao/:descricao')
  @HttpCode(HttpStatus.OK)
  findByTitulo(@Param('descricao') descricao: string): Promise<Tema[]> {
    return this.service.findOneByDescricao(descricao);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  post(@Body() tema: Tema): Promise<Tema> {
    return this.service.create(tema);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  put(@Body() tema: Tema): Promise<Tema> {
    return this.service.update(tema);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: number) {
    this.service.remove(id);
  }
}
