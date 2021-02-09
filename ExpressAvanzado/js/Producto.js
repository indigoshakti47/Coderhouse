"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Productos {
    constructor(array) {
        this.array = array;
    }
    guardar(id, title, price, thumbnail) {
        const newProduct = { id, title, price, thumbnail };
        this.array = [...this.array, newProduct];
        return newProduct;
    }
    recuperarTodo() {
        if (this.array.length === 0) {
            return { error: 'No hay productos cargados' };
        }
        else {
            return this.array;
        }
    }
    recuperarUno(id) {
        let exists = false;
        this.array.forEach(product => {
            if (product.id === id) {
                exists = true;
            }
            else {
                exists = false;
            }
        });
        if (exists) {
            return this.array[id];
        }
        else {
            return { error: 'Producto no encontrado' };
        }
    }
    recuperarCantidad() {
        return this.array.length;
    }
}
exports.default = Productos;
