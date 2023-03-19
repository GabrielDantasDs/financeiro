import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  async create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriasService.create(createCategoriaDto).catch(error => {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    });
  }

  @Get()
  async findAll() {
    return this.categoriasService.findAll().catch(error => {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND)
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.categoriasService.findOne(+id).catch(error => {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND)
    });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    return this.categoriasService.update(+id, updateCategoriaDto).catch(error => {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.categoriasService.remove(+id).catch(error => {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND)
    });
  }
}
