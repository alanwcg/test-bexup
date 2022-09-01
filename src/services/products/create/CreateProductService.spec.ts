import { AppError } from "../../../errors/AppError";
import { ProductsRepository } from "../../../repositories/ProductsRepository";
import { defuse } from "../../../utils/jest/defuse";
import { CreateProductService } from "./CreateProductService";

type SutTypes = {
  sut: CreateProductService;
  productsRepository: ProductsRepository;
}

const makeSut = (): SutTypes => {
  const productsRepository = ProductsRepository.getInstance();
  const sut = new CreateProductService(productsRepository);

  return {
    sut,
    productsRepository,
  }
}

describe('CreateProductService', () => {
  it(`should call ProductsRepository's findByName method with correct value`, async () => {
    const { sut, productsRepository } = makeSut();
    const findByNameSpy = jest.spyOn(productsRepository, 'findByName');
    await sut.execute({ name: 'Computer' });
    expect(findByNameSpy).toHaveBeenCalledWith('Computer');
  });

  it(`should throw AppError 409 if product already exists`, async () => {
    const { sut } = makeSut();
    const promise = sut.execute({ name: 'Computer' });
    await expect(promise).rejects.toEqual(
      new AppError(409, 'Product already exists.', 'ProductAlreadyExistsError'),
    );
  });

  it(`should call ProductsRepository's create method with correct value`, async () => {
    const { sut, productsRepository } = makeSut();
    const createSpy = jest.spyOn(productsRepository, 'create');
    await sut.execute({ name: 'any_name' });
    expect(createSpy).toHaveBeenCalledWith({ name: 'any_name' });
  });

  it(`should throw if ProductsRepository's create method throws`, async () => {
    const { sut, productsRepository } = makeSut();
    jest
      .spyOn(productsRepository, 'create')
      .mockReturnValueOnce(
        defuse(new Promise((_, reject) => reject(new Error()))),
      )
    const promise = sut.execute({ name: 'another_name' });
    await expect(promise).rejects.toThrow();
  });

  it(`should return a product on success`, async () => {
    const { sut } = makeSut();
    const product = await sut.execute({ name: 'Phone' });
    expect(product).toBeTruthy();
    expect(product).toBeDefined();
    expect(product.name).toBeDefined();
  });
});