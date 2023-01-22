import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, UseGuards} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { Postagem } from "../entities/postagem.entity";
import { PostagemService } from "../service/postagem.service";


@ApiBearerAuth()
@ApiTags('Postagem')
@Controller("/postagens")
@UseGuards(JwtAuthGuard)
export class PostagemController {
  constructor(private readonly service: PostagemService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Postagem[]> {
    return this.service.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id') id: number): Promise<Postagem> {
    return this.service.findOneById(id);
  }

  @Get('/titulo/:titulo')
  @HttpCode(HttpStatus.OK)
  findByTitulo(@Param('titulo') titulo: string): Promise<Postagem[]> {
    return this.service.findOneByTitulo(titulo);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  post(@Body() post: Postagem): Promise<Postagem> {
    return this.service.create(post);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  put(@Body() post: Postagem): Promise<Postagem> {
    return this.service.update(post);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: number) {
    this.service.remove(id);
  }
}