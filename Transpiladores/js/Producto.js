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
        return this.array.length === 0 ? { error: 'No hay productos cargados' } : this.array;
    }
    actualizarUno(id, title, price, thumbnail) {
        this.array.forEach(product => {
            if (product.id === id) {
                product.price = price;
                product.title = title;
                product.thumbnail = thumbnail;
            }
        });
    }
    eliminarUno(id) {
        let deletedProduct = this.array.filter(product => product.id === id);
        this.array = this.array.filter(product => product.id !== id);
        return deletedProduct;
    }
    recuperarUno(id) {
        let exists;
        exists = this.array.find(product => product.id === id);
        return exists ? exists : { error: 'Producto no encontrado' };
    }
    recuperarCantidad() {
        return this.array.length;
    }
}
exports.default = Productos;
