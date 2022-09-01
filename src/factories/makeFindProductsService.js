"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFindProductsService = void 0;
const ProductsRepository_1 = require("../repositories/ProductsRepository");
const FindProductsService_1 = require("../services/products/find/FindProductsService");
const makeFindProductsService = () => {
    const repository = ProductsRepository_1.ProductsRepository.getInstance();
    const service = new FindProductsService_1.FindProductsService(repository);
    return service;
};
exports.makeFindProductsService = makeFindProductsService;
