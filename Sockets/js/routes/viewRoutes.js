"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productRoutes_1 = require("./productRoutes");
const router = express_1.default.Router();
router.get('/vista', (req, res) => {
    const data = productRoutes_1.producto.recuperarTodo();
    const cantidad = productRoutes_1.producto.recuperarCantidad();
    let empty = false;
    if (cantidad === 0)
        empty = true;
    res.render('main', { data, empty });
});
exports.default = router;
