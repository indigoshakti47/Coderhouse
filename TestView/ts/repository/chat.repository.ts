import {Chat} from "../database/mongo.db"

export class ChatRepository {
  constructor( ) {
  }

  async guardarMensaje(
    email: string, 
    date: string,
    message: string) {
    try{
 
      const data = new Chat({
        email,
        date,
        message
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

