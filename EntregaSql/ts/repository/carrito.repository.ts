import knex, { Knex } from "knex";
import { mariaConfig } from "../database/mariadb.db";

const knexConnection: Knex<any, unknown[]> = knex(mariaConfig);
export class CarritoRepository {
  constructor( ) {

  }

  async guardarProducto(
    id_carrito: number, 
    id_producto: number) {
    try{
 
      const data = knexConnection.from("carrito_productos").insert({
        id_carrito,
        id_producto
      });
      console.log(`Producto guardado`)
      return data
    } catch(err) {
      console.log(err)
    }
  }

  async leer() {
    try {
      const carrito = await knexConnection.from("carrito").select("*");

      let carritoFinal = []
      for(let car in carrito){
        let carr = await this.leerUno(carrito[car].id)
        carritoFinal.push(carr)
      }
       
      return carritoFinal;
    } catch (error) {
      console.log([]);
      return [];
    }
  }

  async leerUno(
    id_carrito: number
  ) {
    try {
      const carrito = await knexConnection.from("carrito").select("*")
        .where("id", id_carrito);
      const products = await knexConnection.from("carrito_productos")
        .select("productos.*")
        .innerJoin("productos", {"carrito_productos.id_producto": "productos.id"})
        .where("id_carrito", id_carrito);
      
      const carritoFinal = carrito[0]
      carritoFinal.products = products
      return carritoFinal;
    } catch (error) {
      console.log([]);
      return [];
    }
  }

  async borrarProducto(
    id_carrito: number, 
    id_producto: number
  ){
    try{
 
      const data = knexConnection.from("carrito_productos")
      .where("id_carrito", id_carrito)
      .andWhere("id_producto", id_producto)
      .delete();

      console.log(`Producto Eliminado`)
      return await data;
    } catch(err) {
      console.log(err)
    }
  }
}

