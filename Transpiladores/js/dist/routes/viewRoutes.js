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
var express_1 = __importDefault(require("express"));
var productRoutes_1 = require("./productRoutes");
var Archivo_1 = require("../Archivo");
var router = express_1.default.Router();
router.get('/productos/vista', function (req, res) {
    var data = productRoutes_1.producto.recuperarTodo();
    var cantidad = productRoutes_1.producto.recuperarCantidad();
    var empty = false;
    if (cantidad === 0) empty = true;
    res.render('main', { data: data, empty: empty });
});
router.get('/chat', function (req, res) {
    return __awaiter(void 0, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var leer, file;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return new Archivo_1.ArchivoLeer().leer();

                    case 2:
                        leer = _context.sent;
                        file = typeof leer === "string" ? JSON.parse(leer) : leer;

                        res.render('chat', { file: file });

                    case 5:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
});
exports.default = router;