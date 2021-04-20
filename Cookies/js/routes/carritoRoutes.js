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
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const Carrito_1 = __importDefault(require("../service/Carrito"));
const router = express_1.default.Router();
exports.router = router;
let carrito = new Carrito_1.default();
router.get('/listar/:id?', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (id)
            res.send(yield carrito.recuperarUno(id));
        if (!id)
            res.send(yield carrito.recuperarTodo());
    }
    catch (err) {
        console.log(err);
    }
}));
router.patch('/agregar/:id_carrito', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_producto } = req.body;
        const id_carrito = parseInt(req.params.id_carrito);
        res.send(yield carrito.guardarProducto(id_carrito, id_producto));
    }
    catch (err) {
        console.log(err);
    }
}));
router.patch('/borrar/:id_carrito', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_producto } = req.body;
        const id_carrito = parseInt(req.params.id_carrito);
        const deletedProduct = yield carrito.eliminarUno(id_carrito, id_producto);
        res.send(deletedProduct);
    }
    catch (error) {
        console.log(error);
    }
}));
