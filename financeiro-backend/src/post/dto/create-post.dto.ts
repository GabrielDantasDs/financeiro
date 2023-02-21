import { Prisma } from "@prisma/client";
import { IsInt, IsOptional, IsString } from "class-validator";
import { Post } from "../entities/post.entity";

export class CreatePostDto extends Post {
    
    @IsString()
    @IsOptional()
    title?: string | null

    @IsString()
    @IsOptional()
    content?: string | null

    @IsString()
    @IsOptional()
    published?: boolean | null

    @IsInt()
    @IsOptional()
    author?: Prisma.UserCreateNestedOneWithoutPostsInput
}
