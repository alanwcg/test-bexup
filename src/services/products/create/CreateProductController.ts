import { Request, Response } from "express";
import { makeCreateProductService } from "../../../factories/makeCreateProductService";

export class CreateProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body

    const service = makeCreateProductService();
    const product = await service.execute({ name });

    return response.status(201).json(product)
  }
}