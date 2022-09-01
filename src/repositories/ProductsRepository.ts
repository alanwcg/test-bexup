import { IProductsRepository } from "../interfaces/IProductsRepository";
import { Product } from "../models/Product";

export class ProductsRepository implements IProductsRepository {
  private static instance: ProductsRepository;
  private products: Product[] = [];
  
  private constructor() {}
  
  async create(product: Product): Promise<Product> {
    this.products.push(product);
    return product
  }

  async findAll(): Promise<Product[]> {
    return this.products;
  }

  async findByName(name: string): Promise<Product | undefined> {
    return this.products.find(product => product.name === name);
  }

  public static getInstance(): ProductsRepository {
    if (!ProductsRepository.instance) {
      ProductsRepository.instance = new ProductsRepository();
    }

    return ProductsRepository.instance;
  }
}