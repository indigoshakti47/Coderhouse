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
    if(this.array.length === 0){
      return {error: 'No hay productos cargados'}
    } else {
      return this.array
    }
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
    let exists: Boolean = false;

    this.array.forEach(product => {
      if(product.id === id){
        exists = true
      } else {
        exists = false
      }
    })

    if(exists){
      return this.array[id]
    } else {
      return {error: 'Producto no encontrado'}
    }
  }

  recuperarCantidad(){
    return this.array.length
  }

}