import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) { };

  async create(data: CreatePostDto) {

    let response = this.prisma.post.create({
      data,
      select: { id: true },
    }).catch((e) => {
      throw Error(e)
    })

    return response;
  }

  findAll() {
    let response = this.prisma.post.findMany().catch(e => {
      throw Error(e)
    });

    return response;
  }

  findOne(id: number) {
    let response = this.prisma.post.findUniqueOrThrow({
      where: {
        id
      }
    });
    
    return response;
  }

  update(id: number, data: UpdatePostDto) {
    let response = this.prisma.post.update({
      where: {
        id
      },
      data
    });

    return response;
  }

  async remove(id: number) {
    
    let response = this.prisma.post.delete({
      where: {
        id
      }
    }).catch(e => {
      throw Error(e)
    });

    return response;
  }
}
