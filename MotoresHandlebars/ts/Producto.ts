interface Producto {
  id: number,
  title: String,
  price: number,
  thumbnail: String
}

export default class Productos {

  array: Array<Producto>

  constructor(array: Array<Producto>) {
    this.array = array;
  }

  
  guardar(id: number, title: string, price: number, thumbnail: string) {

    const newProduct: Producto = {id, title, price, thumbnail}
    this.array = [...this.array, newProduct]

    return newProduct;

  }

  recuperarTodo(){
    return this.array.length === 0 ? {error: 'No hay productos cargados'} : this.array
  }

  actualizarUno(id: number, title: any, price: number, thumbnail: string) {

    this.array.forEach(product => {
      if(product.id === id){
        product.price = price
        product.title = title
        product.thumbnail = thumbnail
      }
    })
  }

  eliminarUno(id: number) {

    let deletedProduct = this.array.filter(product => product.id === id)
    this.array = this.array.filter(product => product.id !== id)
    return deletedProduct
  }

  recuperarUno(id: number){
    let exists: Producto;

    exists = this.array.find(product => product.id === id )!!
    return exists ? exists : {error: 'Producto no encontrado'}
  }

  recuperarCantidad(){
    return this.array.length
  }

}