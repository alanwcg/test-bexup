import { ProductsRepository } from "../repositories/ProductsRepository";
import { CreateProductService } from "../services/products/create/CreateProductService";

export const makeCreateProductService = (): CreateProductService => {
  const repository = ProductsRepository.getInstance();
  const service = new CreateProductService(repository);
  return service;
}