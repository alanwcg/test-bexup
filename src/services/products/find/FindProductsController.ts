import { Request, Response } from "express";
import { makeFindProductsService } from "../../../factories/makeFindProductsService";

export class FindProductsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.query;

    const service = makeFindProductsService();
    const products = await service.execute({
      name: name as string,
    });

    return response.json(products);
  }
}