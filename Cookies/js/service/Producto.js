"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_repository_1 = require("../repository/product.repository");
const productoRepository = new product_repository_1.ProductoRepository();
class Productos {
    constructor() {
    }
    guardar(nombre, descripcion, codigo, foto, precio, stock) {
        return __awaiter(this, void 0, void 0, function* () {
            const timestampp = new Date();
            const newProduct = { nombre, descripcion, codigo, foto, precio, stock };
            yield productoRepository.guardar(timestampp, nombre, descripcion, codigo, foto, precio, stock);
            return newProduct;
        });
    }
    recuperarTodo() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield productoRepository.leer()).length === 0 ? { error: 'No hay productos cargados' } : (yield productoRepository.leer());
        });
    }
    actualizarUno(id, nombre, descripcion, codigo, foto, precio, stock) {
        return __awaiter(this, void 0, void 0, function* () {
            yield productoRepository.actualizar(id, nombre, descripcion, codigo, foto, precio, stock);
        });
    }
    eliminarUno(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let deletedProduct = yield productoRepository.leer(id);
                yield productoRepository.eliminar(id);
                return deletedProduct;
            }
            catch (err) {
                return err;
            }
        });
    }
    recuperarUno(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield productoRepository.leer(id)).length === 0 ? { error: 'Producto no encontrado' } : (yield productoRepository.leer(id));
        });
    }
}
exports.default = Productos;
