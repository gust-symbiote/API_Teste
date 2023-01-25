import { JwtAuthGuard } from './../../auth/guard/jwt-auth.guard';
import { Usuario } from './../entities/usuario.entity';
import { UsuarioService } from './../service/usuario.service';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Usuario')
@UseGuards(JwtAuthGuard)
@Controller('/usuarios')
@ApiBearerAuth()
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Usuario[]> {
        return this.usuarioService.findAll();
    }
    
    @Get('/all')
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Usuario[]> {
        return this.usuarioService.findAll();
    }
    
    @HttpCode(HttpStatus.OK)
    @Get("/:id")
    findById(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
        return this.usuarioService.findById(id)
    }
    
    @HttpCode(HttpStatus.OK)
    @Get("/:nome")
    findByNome(@Param('nome') nome: string): Promise<Usuario> {
        return this.usuarioService.findByNome(nome)
    }
    
    @HttpCode(HttpStatus.CREATED)
    @Post('/cadastrar')
    async create(@Body() usuario: Usuario): Promise<Usuario> {
        return this.usuarioService.create(usuario)
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Put('/atualizar')
    async update (@Body() usuario: Usuario): Promise<Usuario> {
        return this.usuarioService.update(usuario)
    }
}
