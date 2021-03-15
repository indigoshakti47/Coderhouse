import knex, { Knex } from "knex";
import { sqliteConfig } from "../database/sqlite.db";

const knexConnection: Knex<any, unknown[]> = knex(sqliteConfig);
export class ChatRepository {
  constructor( ) {
  }

  crearTabla(){
    knexConnection.schema.hasTable('chat').then(function(exists) {
      if (!exists) {
        return knexConnection.schema.createTable('chat', table => {
          table.increments("id").primary().notNullable();
          table.string("email");
          table.string("date");
          table.string("message");
        })
        .then(() => console.log("Table created"))
        .finally(() => knexConnection.destroy())
      }
    });
  }

  async guardarMensaje(
    email: string, 
    date: string,
    message: string) {
    try{
 
      const data = knexConnection.from("chat").insert({
        email,
        date,
        message
      });
      console.log(`Mensaje guardado`)
      return data
    } catch(err) {
      console.log(err)
    }
  }

  async leer() {
    try {
      const mensajes = await knexConnection.from("chat").select("*");
       
      return mensajes;
    } catch (error) {
      console.log([]);
      return [];
    }
  }
}

