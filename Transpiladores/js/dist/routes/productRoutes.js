"use strict";

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = undefined && undefined.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.producto = exports.router = void 0;
var express_1 = __importDefault(require("express"));
var Producto_1 = __importDefault(require("../Producto"));
var router = express_1.default.Router();
exports.router = router;
var producto = new Producto_1.default([]);
exports.producto = producto;
router.get('/productos', function (req, res) {
    return __awaiter(void 0, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        try {
                            res.send(producto.recuperarTodo());
                        } catch (err) {
                            console.log(err);
                        }

                    case 1:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
});
router.get('/productos/:id', function (req, res) {
    return __awaiter(void 0, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var id;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        try {
                            id = parseInt(req.params.id);

                            res.send(producto.recuperarUno(id));
                        } catch (err) {
                            console.log(err);
                        }

                    case 1:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));
});
router.post('/producto', function (req, res) {
    return __awaiter(void 0, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _req$body, title, price, thumbnail;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        try {
                            _req$body = req.body, title = _req$body.title, price = _req$body.price, thumbnail = _req$body.thumbnail;

                            res.send(producto.guardar(producto.recuperarCantidad(), title, price, thumbnail));
                        } catch (err) {
                            console.log(err);
                        }

                    case 1:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));
});
router.post('/producto/vista', function (req, res) {
    return __awaiter(void 0, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var _req$body2, title, price, thumbnail;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        try {
                            _req$body2 = req.body, title = _req$body2.title, price = _req$body2.price, thumbnail = _req$body2.thumbnail;

                            producto.guardar(producto.recuperarCantidad(), title, price, thumbnail);
                            res.redirect('/');
                        } catch (err) {
                            console.log(err);
                        }

                    case 1:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));
});
router.put('/producto/:id', function (req, res) {
    return __awaiter(void 0, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var id, _req$body3, title, price, thumbnail;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        try {
                            id = parseInt(req.params.id);
                            _req$body3 = req.body, title = _req$body3.title, price = _req$body3.price, thumbnail = _req$body3.thumbnail;

                            producto.actualizarUno(id, title, price, thumbnail);
                            res.send({ title: title, price: price, thumbnail: thumbnail });
                        } catch (err) {
                            console.log(err);
                        }

                    case 1:
                    case "end":
                        return _context5.stop();
                }
            }
        }, _callee5, this);
    }));
});
router.delete('/producto/:id', function (req, res) {
    return __awaiter(void 0, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var id, deletedProduct;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        try {
                            id = parseInt(req.params.id);
                            deletedProduct = producto.eliminarUno(id);

                            res.send(deletedProduct);
                        } catch (error) {
                            console.log(error);
                        }

                    case 1:
                    case "end":
                        return _context6.stop();
                }
            }
        }, _callee6, this);
    }));
});