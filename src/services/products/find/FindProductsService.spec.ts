import { AppError } from "../../../errors/AppError";
import { ProductsRepository } from "../../../repositories/ProductsRepository";
import { defuse } from "../../../utils/jest/defuse";
import { CreateProductService } from "../create/CreateProductService";
import { FindProductsService } from "./FindProductsService";

type SutTypes = {
  sut: FindProductsService;
  productsRepository: ProductsRepository;
  createProductService: CreateProductService;
}

const makeSut = (): SutTypes => {
  const productsRepository = ProductsRepository.getInstance();
  const createProductService = new CreateProductService(productsRepository);
  const sut = new FindProductsService(productsRepository);

  return {
    sut,
    productsRepository,
    createProductService,
  }
}

describe('CreateProductService', () => {
  it(`should call ProductsRepository's findAll method`, async () => {
    const { sut, productsRepository } = makeSut();
    const findAllSpy = jest.spyOn(productsRepository, 'findAll');
    await sut.execute({});
    expect(findAllSpy).toHaveBeenCalled();
  });

  it(`should throw if ProductsRepository's findAll method throws`, async () => {
    const { sut, productsRepository } = makeSut();
    jest
      .spyOn(productsRepository, 'findAll')
      .mockReturnValueOnce(
        defuse(new Promise((_, reject) => reject(new Error()))),
      )
    const promise = sut.execute({});
    await expect(promise).rejects.toThrow();
  });

  it(`should return emtpy array if filter does not find a product`, async () => {
    const { sut } = makeSut();
    const products = await sut.execute({ name: 'non existing product' });
    expect(products).toStrictEqual([]);
  });

  it(`should find products with provided filter`, async () => {
    const { sut, createProductService } = makeSut();
    await createProductService.execute({ name: 'any_name' });
    const products = await sut.execute({ name: 'any_name' });
    expect(products).toHaveLength(1);
    expect(products).toStrictEqual(expect.arrayContaining([
      expect.objectContaining({
        name: expect.any(String),
      })
    ]));
  });

  it(`should return all products if no filter is provided`, async () => {
    const { sut, createProductService } = makeSut();
    await createProductService.execute({ name: 'another_name' });
    const products = await sut.execute({});
    expect(products).toHaveLength(2);
    expect(products).toStrictEqual(expect.arrayContaining([
      expect.objectContaining({
        name: expect.any(String),
      })
    ]));;
  });
});