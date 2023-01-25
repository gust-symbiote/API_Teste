import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { Usuario } from "../entities/usuario.entity";
import { UsuarioService } from "../service/usuario.service";


@ApiTags('Usuario')
@Controller('/usuarios')
@ApiBearerAuth()
export class UsuarioController{
    constructor(private readonly UsuarioService: UsuarioService) { }

    @UseGuards(JwtAuthGuard)
    @Get('/all')
        @HttpCode(HttpStatus.OK)
             findAll(): Promise<Usuario[]> {
                return this.UsuarioService.findAll();
    }

    @Get('/:id')
        @HttpCode(HttpStatus.OK)
            findById(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
                return this.UsuarioService.findById(id);
    }

    @Get('/nome/:nome')
        @HttpCode(HttpStatus.OK)
            findByNome(@Param('nome') nome:string): Promise<Usuario>{
                return this.UsuarioService.findByNome(nome);
    }

    @Get('/usuario/:usuario')
        @HttpCode(HttpStatus.OK)
            findByUsuario(@Param('usuario') usuario:string): Promise<Usuario>{
                return this.UsuarioService.findByUsuario(usuario);
    }

    @Post('/cadastrar')
        @HttpCode(HttpStatus.CREATED)
           async create(@Body() usuario: Usuario): Promise<Usuario>{
                return this.UsuarioService.create(usuario);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/atualizar')
        @HttpCode(HttpStatus.OK)
            async update(@Body() usuario: Usuario): Promise<Usuario>{
                return this.UsuarioService.update(usuario);
    }

}
