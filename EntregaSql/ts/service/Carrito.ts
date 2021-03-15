import {CarritoRepository} from "../repository/carrito.repository"
import { ProductoRepository } from "../repository/product.repository";

const carritoRepository: CarritoRepository = new CarritoRepository();
const productoRepository: ProductoRepository = new ProductoRepository();

export default class Productos {

  constructor() {
  }

  
  async guardarProducto(id_carrito: number, id_producto: number) {
 
    await carritoRepository.guardarProducto(id_carrito, id_producto);

    return await productoRepository.leer(id_producto)

  }

  async recuperarTodo(){
    return (await carritoRepository.leer()).length === 0 ? {error: 'No hay carrito cargados'} : (await carritoRepository.leer())
  }


  async eliminarUno(id_carrito: number, id_producto: number) {

    const producto_eliminado = await productoRepository.leer(id_producto)
    await carritoRepository.borrarProducto(id_carrito, id_producto);

    return producto_eliminado
  }

  async recuperarUno(id_carrito: number){
    return await carritoRepository.leerUno(id_carrito)
  }

}