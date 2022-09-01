import { IProductsRepository } from "../../../interfaces/IProductsRepository";
import { Product } from "../../../models/Product";

type QueryFilters = {
  name?: string
}

export class FindProductsService {
  constructor(private productsRepository: IProductsRepository) {}

  async execute({ name }: QueryFilters): Promise<Product[]> {
    const products = await this.productsRepository.findAll();

    if (name) {
      const filteredProducts = products.filter(product => {
        const productName = product.name.toLowerCase();
        const nameFilter = name?.toLowerCase();
  
        return productName.localeCompare(String(nameFilter), 'pt', { sensitivity: 'base' }) === 0;
      });
  
      return filteredProducts;
    }

    return products;
  }
}