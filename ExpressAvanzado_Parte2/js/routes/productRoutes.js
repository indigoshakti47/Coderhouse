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
const Producto_1 = __importDefault(require("../Producto"));
const router = express_1.default.Router();
let producto = new Producto_1.default([]);
router.get('/productos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(producto.recuperarTodo());
    }
    catch (err) {
        console.log(err);
    }
}));
router.get('/productos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        res.send(producto.recuperarUno(id));
    }
    catch (err) {
        console.log(err);
    }
}));
router.post('/producto', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, price, thumbnail } = req.body;
        res.send(producto.guardar(producto.recuperarCantidad(), title, price, thumbnail));
    }
    catch (err) {
        console.log(err);
    }
}));
router.put('/producto/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { title, price, thumbnail } = req.body;
        producto.actualizarUno(id, title, price, thumbnail);
        res.send({ title, price, thumbnail });
    }
    catch (err) {
        console.log(err);
    }
}));
router.delete('/producto/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const deletedProduct = producto.eliminarUno(id);
        res.send(deletedProduct);
    }
    catch (error) {
        console.log(error);
    }
}));
exports.default = router;
