import { Product } from "../models/Product";

export interface IProductsRepository {
  create(product: Product): Promise<Product>;
  findAll(): Promise<Product[]>;
  findByName(name: string): Promise<Product | undefined>;
}