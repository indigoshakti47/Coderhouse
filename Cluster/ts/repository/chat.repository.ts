import {Chat} from "../database/mongo.db"

export class ChatRepository {
  constructor( ) {
  }

  async guardarMensaje(
    email: string, 
    date: string,
    message: string, 
    nombre: string, 
    apellido: string, 
    alias: string, 
    avatar: string, 
    edad: string) {

    try{
 
      const data = new Chat({
        author:{
          id: email,
          nombre,
          apellido,
          edad,
          alias,
          avatar
        },
        text: {text: message, date}
      });
      console.log(`Mensaje guardado`)
      return data.save()
    } catch(err) {
      console.log(err)
    }
  }

  async leer() {
    try {
      const mensajes = await Chat.find({}).lean()
       
      return mensajes;
    } catch (error) {
      console.log([]);
      return [];
    }
  }
}

