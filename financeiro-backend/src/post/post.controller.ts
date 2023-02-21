import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpException,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async create(@UploadedFile() file: Express.Multer.File, @Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto).catch((err) => {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    });
  }

  @Get()
  async findAll() {
    let response = await this.postService.findAll();

    if (response.length == 0) {
      throw new HttpException(
        'Nenhum registro encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    return response;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.postService.findOne(+id).catch((err) => {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    });
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto).catch((err) => {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.postService.remove(+id).catch((err) => {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    });
  }
}
