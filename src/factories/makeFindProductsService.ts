import { ProductsRepository } from "../repositories/ProductsRepository";
import { FindProductsService } from "../services/products/find/FindProductsService";

export const makeFindProductsService = (): FindProductsService => {
  const repository = ProductsRepository.getInstance();
  const service = new FindProductsService(repository);
  return service;
}