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
const mongo_db_1 = require("../database/mongo.db");
const mongoose_1 = __importDefault(require("mongoose"));
class ProductoRepository {
    constructor() {
    }
    guardar(timestampp, nombre, descripcion, codigo, foto, precio, stock) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = new mongo_db_1.Product({
                    timestampp,
                    nombre,
                    descripcion,
                    codigo,
                    foto,
                    precio,
                    stock
                });
                console.log(`Producto guardado`);
                return yield data.save();
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    leer(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(id);
                let search = {};
                if (id)
                    search = { _id: mongoose_1.default.Types.ObjectId(id) };
                const data = yield mongo_db_1.Product.find(search);
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
                console.log(id);
                yield mongo_db_1.Product.deleteOne({ _id: mongoose_1.default.Types.ObjectId(id) });
                return id;
            }
            catch (error) {
                return error;
            }
        });
    }
    actualizar(id, nombre, descripcion, codigo, foto, precio, stock) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateData = {};
                if (nombre)
                    updateData.nombre = nombre;
                if (descripcion)
                    updateData.descripcion = descripcion;
                if (codigo)
                    updateData.codigo = codigo;
                if (foto)
                    updateData.foto = foto;
                if (precio)
                    updateData.precio = precio;
                if (stock)
                    updateData.stock = stock;
                const data = mongo_db_1.Product.updateOne({ _id: mongoose_1.default.Types.ObjectId(id) }, updateData);
                return yield data;
            }
            catch (error) {
                return error;
            }
        });
    }
}
exports.ProductoRepository = ProductoRepository;
