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
const express_1 = __importDefault(require("express"));
const Producto_1 = __importDefault(require("./Producto"));
const app = express_1.default();
app.use(express_1.default.json());
let producto = new Producto_1.default([]);
app.get('/api/productos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(producto.recuperarTodo());
    }
    catch (err) {
        console.log(err);
    }
}));
app.get('/api/productos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        res.send(producto.recuperarUno(id));
    }
    catch (err) {
        console.log(err);
    }
}));
app.post('/api/producto', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, price, thumbnail } = req.body;
        res.send(producto.guardar(producto.recuperarCantidad(), title, price, thumbnail));
    }
    catch (err) {
        console.log(err);
    }
}));
app.listen(8080, () => {
    console.log(`El servidor está corriendo en el puerto 8080`);
});
