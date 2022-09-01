import { AppError } from "../../../errors/AppError";
import { IProductsRepository } from "../../../interfaces/IProductsRepository";
import { Product } from "../../../models/Product";

type Request = {
  name: string;
}

export class CreateProductService {
  constructor(private productsRepository: IProductsRepository) {}

  async execute({ name }: Request): Promise<Product> {
    const product = await this.productsRepository.findByName(name);

    if (product) {
      throw new AppError(409, 'Product already exists.', 'ProductAlreadyExistsError');
    }

    return this.productsRepository.create({
      name
    });
  }
}