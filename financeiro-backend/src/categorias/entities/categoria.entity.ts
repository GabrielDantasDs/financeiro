import { Prisma } from "@prisma/client";

export class Categoria implements Prisma.CategoriesCreateInput {
    cat_name: string;
}
