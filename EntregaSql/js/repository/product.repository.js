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
exports.ProductoRepository = void 0;
const knex_1 = __importDefault(require("knex"));
const mariadb_db_1 = require("../database/mariadb.db");
const knexConnection = knex_1.default(mariadb_db_1.mariaConfig);
class ProductoRepository {
    constructor() {
    }
    crearTabla() {
        knexConnection.schema.hasTable('productos').then(function (exists) {
            if (!exists) {
                return knexConnection.schema.createTable('productos', table => {
                    table.increments("id").primary().notNullable();
                    table.timestamp("timestampp").notNullable();
                    table.string("nombre").notNullable();
                    table.string("descripcion").notNullable();
                    table.string("codigo").notNullable();
                    table.string("foto").notNullable();
                    table.integer("precio").notNullable();
                    table.integer("stock").notNullable();
                })
                    .then(() => console.log("Table created"))
                    .finally(() => knexConnection.destroy());
            }
        });
    }
    guardar(timestampp, nombre, descripcion, codigo, foto, precio, stock) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = knexConnection.from("productos").insert({
                    timestampp,
                    nombre,
                    descripcion,
                    codigo,
                    foto,
                    precio,
                    stock
                });
                console.log(`Producto guardado`);
                return yield data;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    leer(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = knexConnection.from("productos").select("*");
                if (id)
                    data.where("id", id);
                return yield data;
            }
            catch (error) {
                console.log([]);
                return [];
            }
        });
    }
    eliminar(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = knexConnection.from("productos").where("id", id).delete();
                return yield data;
            }
            catch (error) {
                return error;
            }
        });
    }
    actualizar(id, nombre, descripcion, codigo, foto, precio, stock) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = knexConnection.from("productos").where("id", id).update({
                    nombre,
                    descripcion,
                    codigo,
                    foto,
                    precio,
                    stock
                });
                return yield data;
            }
            catch (error) {
                return error;
            }
        });
    }
}
exports.ProductoRepository = ProductoRepository;
