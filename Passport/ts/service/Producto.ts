import {ProductoRepository} from "../repository/product.repository";

export interface Producto {
  id: number, 
  timestampp: Date, 
  nombre: string, 
  descripcion: string, 
  codigo: string, 
  foto: string, 
  precio: number, 
  stock: number
}

const productoRepository: ProductoRepository = new ProductoRepository();

export default class Productos {

  constructor() {
  }

  
  async guardar(nombre: string, descripcion: string, codigo: string, foto: string, precio: number, stock: number) {

    const timestampp: Date = new Date()
    const newProduct = {nombre, descripcion, codigo, foto, precio, stock}
    await productoRepository.guardar(timestampp, nombre, descripcion, codigo, foto, precio, stock)
    return newProduct;

  }

  async recuperarTodo(){
    return (await productoRepository.leer()).length === 0 ? {error: 'No hay productos cargados'} : (await productoRepository.leer())
  }

  async actualizarUno(id: string, nombre: string, descripcion: string, codigo: string, foto: string, precio: number, stock: number) {

    await productoRepository.actualizar(id, nombre, descripcion, codigo, foto, precio, stock);
  }

  async eliminarUno(id: string) {

    try{
      let deletedProduct = await productoRepository.leer(id)
      await productoRepository.eliminar(id);
      return deletedProduct
    }catch(err){
      return err
    }
  }

  async recuperarUno(id: string){
    return (await productoRepository.leer(id)).length === 0 ? {error: 'Producto no encontrado'} : (await productoRepository.leer(id))
  }

}