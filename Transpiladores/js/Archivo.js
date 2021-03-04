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
exports.ArchivoLeer = exports.ArchivoGuardar = void 0;
const fs_1 = __importDefault(require("fs"));
class ArchivoGuardar {
    constructor(email, date, message) {
        this.email = email;
        this.message = message;
        this.date = date;
    }
    /**
     * Función para declarar un nuevo objeto tipo producto para ser usado en la creación del
     * archivo, si ya hay un archivo con productos se añade uno nuevo aumentando el id, si no hay
     * un archivo, retorna un objeto con el producto y el id establecido en 1
     *
     * @returns {Object}
     */
    jsonToSave() {
        try {
            const data = fs_1.default.readFileSync('./Mensajes.txt', 'utf-8');
            let dataFromProducto = JSON.parse(data);
            dataFromProducto.push({
                id: (dataFromProducto.length + 1),
                email: this.email,
                date: this.date,
                message: this.message,
            });
            return dataFromProducto;
        }
        catch (_a) {
            return [{
                    id: 1,
                    email: this.email,
                    date: this.date,
                    message: this.message,
                }];
        }
    }
    guardar() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                fs_1.default.writeFileSync('./Mensajes.txt', JSON.stringify(this.jsonToSave()));
                console.log(`Archivo guardado`);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.ArchivoGuardar = ArchivoGuardar;
class ArchivoLeer {
    constructor() {
    }
    leer() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield fs_1.default.readFileSync('./Mensajes.txt', 'utf-8');
                console.log(data);
                return data;
            }
            catch (error) {
                console.log([]);
                return [];
            }
        });
    }
}
exports.ArchivoLeer = ArchivoLeer;
