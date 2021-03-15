import knex, { Knex } from "knex";
import { mariaConfig } from "../database/mariadb.db";

const knexConnection: Knex<any, unknown[]> = knex(mariaConfig);
export class ProductoRepository {
  constructor() {

  }

  crearTabla(){
    knexConnection.schema.hasTable('productos').then(function(exists) {
      if (!exists) {
        return knexConnection.schema.createTable('productos', table => {
          table.increments("id").primary().notNullable();
          table.timestamp("timestampp").notNullable();
          table.string("nombre").notNullable();
          table.string("descripcion").notNullable();
          table.string("codigo").notNullable();
          table.string("foto").notNullable();
          table.integer("precio").notNullable();
          table.integer("stock").notNullable();
        })
        .then(() => console.log("Table created"))
        .finally(() => knexConnection.destroy())
      }
    });
  }

  async guardar(
    timestampp: Date,
    nombre: string,
    descripcion: string,
    codigo: string,
    foto: string,
    precio: number,
    stock: number) {

    try {
      const data = knexConnection.from("productos").insert({
        timestampp,
        nombre,
        descripcion,
        codigo,
        foto,
        precio,
        stock
      });
      console.log(`Producto guardado`)
      return await data;
    } catch (err) {
      console.log(err)
    }
  }

  async leer(id?: number) {
    try {
      const data = knexConnection.from("productos").select("*");
      if (id) data.where("id", id)
      return await data;
    } catch (error) {
      console.log([]);
      return [];
    }
  }

  async eliminar(id: number) {
    try {
      const data = knexConnection.from("productos").where("id", id).delete();
      return await data;
    } catch (error) {
      return error;
    }
  }

  async actualizar(id: number, nombre: string, descripcion: string, codigo: string, foto: string, precio: number, stock: number) {
    try {
      const data = knexConnection.from("productos").where("id", id).update({
        nombre,
        descripcion,
        codigo,
        foto,
        precio,
        stock
      });
      return await data;
    } catch (error) {
      return error;
    }
  }
}

