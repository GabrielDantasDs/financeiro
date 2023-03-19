import { IsString } from "class-validator";
import { Categoria } from "../entities/categoria.entity";

export class CreateCategoriaDto extends Categoria {

    @IsString()
    cat_name: string;
}
