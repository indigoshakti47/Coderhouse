"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var Productos = function () {
    function Productos(array) {
        _classCallCheck(this, Productos);

        this.array = array;
    }

    _createClass(Productos, [{
        key: "guardar",
        value: function guardar(id, title, price, thumbnail) {
            var newProduct = { id: id, title: title, price: price, thumbnail: thumbnail };
            this.array = [].concat(_toConsumableArray(this.array), [newProduct]);
            return newProduct;
        }
    }, {
        key: "recuperarTodo",
        value: function recuperarTodo() {
            return this.array.length === 0 ? { error: 'No hay productos cargados' } : this.array;
        }
    }, {
        key: "actualizarUno",
        value: function actualizarUno(id, title, price, thumbnail) {
            this.array.forEach(function (product) {
                if (product.id === id) {
                    product.price = price;
                    product.title = title;
                    product.thumbnail = thumbnail;
                }
            });
        }
    }, {
        key: "eliminarUno",
        value: function eliminarUno(id) {
            var deletedProduct = this.array.filter(function (product) {
                return product.id === id;
            });
            this.array = this.array.filter(function (product) {
                return product.id !== id;
            });
            return deletedProduct;
        }
    }, {
        key: "recuperarUno",
        value: function recuperarUno(id) {
            var exists = void 0;
            exists = this.array.find(function (product) {
                return product.id === id;
            });
            return exists ? exists : { error: 'Producto no encontrado' };
        }
    }, {
        key: "recuperarCantidad",
        value: function recuperarCantidad() {
            return this.array.length;
        }
    }]);

    return Productos;
}();

exports.default = Productos;