"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFakeData = void 0;
const faker_1 = __importDefault(require("faker"));
function createFakeData(cant = 10) {
    let products = [];
    for (let i = 0; i < cant; i++) {
        const product = {
            nombre: faker_1.default.commerce.productName(),
            precio: faker_1.default.commerce.price(),
            foto: faker_1.default.image.imageUrl()
        };
        products.push(product);
    }
    return products;
}
exports.createFakeData = createFakeData;
