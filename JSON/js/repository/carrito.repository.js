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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarritoRepository = void 0;
const knex_1 = __importDefault(require("knex"));
const mariadb_db_1 = require("../database/mariadb.db");
const knexConnection = knex_1.default(mariadb_db_1.mariaConfig);
class CarritoRepository {
    constructor() {
    }
    guardarProducto(id_carrito, id_producto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = knexConnection.from("carrito_productos").insert({
                    id_carrito,
                    id_producto
                });
                console.log(`Producto guardado`);
                return data;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    leer() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const carrito = yield knexConnection.from("carrito").select("*");
                let carritoFinal = [];
                for (let car in carrito) {
                    let carr = yield this.leerUno(carrito[car].id);
                    carritoFinal.push(carr);
                }
                return carritoFinal;
            }
            catch (error) {
                console.log([]);
                return [];
            }
        });
    }
    leerUno(id_carrito) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const carrito = yield knexConnection.from("carrito").select("*")
                    .where("id", id_carrito);
                const products = yield knexConnection.from("carrito_productos")
                    .select("productos.*")
                    .innerJoin("productos", { "carrito_productos.id_producto": "productos.id" })
                    .where("id_carrito", id_carrito);
                const carritoFinal = carrito[0];
                carritoFinal.products = products;
                return carritoFinal;
            }
            catch (error) {
                console.log([]);
                return [];
            }
        });
    }
    borrarProducto(id_carrito, id_producto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = knexConnection.from("carrito_productos")
                    .where("id_carrito", id_carrito)
                    .andWhere("id_producto", id_producto)
                    .delete();
                console.log(`Producto Eliminado`);
                return yield data;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.CarritoRepository = CarritoRepository;
