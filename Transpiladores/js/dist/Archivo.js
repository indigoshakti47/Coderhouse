"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
exports.ArchivoLeer = exports.ArchivoGuardar = void 0;
var fs_1 = __importDefault(require("fs"));

var ArchivoGuardar = function () {
    function ArchivoGuardar(email, date, message) {
        _classCallCheck(this, ArchivoGuardar);

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


    _createClass(ArchivoGuardar, [{
        key: "jsonToSave",
        value: function jsonToSave() {
            try {
                var data = fs_1.default.readFileSync('./Mensajes.txt', 'utf-8');
                var dataFromProducto = JSON.parse(data);
                dataFromProducto.push({
                    id: dataFromProducto.length + 1,
                    email: this.email,
                    date: this.date,
                    message: this.message
                });
                return dataFromProducto;
            } catch (_a) {
                return [{
                    id: 1,
                    email: this.email,
                    date: this.date,
                    message: this.message
                }];
            }
        }
    }, {
        key: "guardar",
        value: function guardar() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                try {
                                    fs_1.default.writeFileSync('./Mensajes.txt', JSON.stringify(this.jsonToSave()));
                                    console.log("Archivo guardado");
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
        }
    }]);

    return ArchivoGuardar;
}();

exports.ArchivoGuardar = ArchivoGuardar;

var ArchivoLeer = function () {
    function ArchivoLeer() {
        _classCallCheck(this, ArchivoLeer);
    }

    _createClass(ArchivoLeer, [{
        key: "leer",
        value: function leer() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var data;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.prev = 0;
                                _context2.next = 3;
                                return fs_1.default.readFileSync('./Mensajes.txt', 'utf-8');

                            case 3:
                                data = _context2.sent;

                                console.log(data);
                                return _context2.abrupt("return", data);

                            case 8:
                                _context2.prev = 8;
                                _context2.t0 = _context2["catch"](0);

                                console.log([]);
                                return _context2.abrupt("return", []);

                            case 12:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[0, 8]]);
            }));
        }
    }]);

    return ArchivoLeer;
}();

exports.ArchivoLeer = ArchivoLeer;