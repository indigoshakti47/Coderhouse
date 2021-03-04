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
const productRoutes_1 = require("./productRoutes");
const Archivo_1 = require("../Archivo");
const router = express_1.default.Router();
router.get('/productos/vista', (req, res) => {
    const data = productRoutes_1.producto.recuperarTodo();
    const cantidad = productRoutes_1.producto.recuperarCantidad();
    let empty = false;
    if (cantidad === 0)
        empty = true;
    res.render('main', { data, empty });
});
router.get('/chat', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const leer = yield new Archivo_1.ArchivoLeer().leer();
    const file = typeof (leer) === "string" ? JSON.parse(leer) : leer;
    res.render('chat', { file });
}));
exports.default = router;
