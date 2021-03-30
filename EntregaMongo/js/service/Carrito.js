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
const carrito_repository_1 = require("../repository/carrito.repository");
const product_repository_1 = require("../repository/product.repository");
const carritoRepository = new carrito_repository_1.CarritoRepository();
const productoRepository = new product_repository_1.ProductoRepository();
class Productos {
    constructor() {
    }
    guardarProducto(id_carrito, id_producto) {
        return __awaiter(this, void 0, void 0, function* () {
            yield carritoRepository.guardarProducto(id_carrito, id_producto);
            return yield productoRepository.leer(id_producto);
        });
    }
    recuperarTodo() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield carritoRepository.leer()).length === 0 ? { error: 'No hay carrito cargados' } : (yield carritoRepository.leer());
        });
    }
    eliminarUno(id_carrito, id_producto) {
        return __awaiter(this, void 0, void 0, function* () {
            const producto_eliminado = yield productoRepository.leer(id_producto);
            yield carritoRepository.borrarProducto(id_carrito, id_producto);
            return producto_eliminado;
        });
    }
    recuperarUno(id_carrito) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield carritoRepository.leerUno(id_carrito);
        });
    }
}
exports.default = Productos;
