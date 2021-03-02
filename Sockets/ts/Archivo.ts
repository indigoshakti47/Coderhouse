import fs from "fs";

export class ArchivoGuardar {

  email: string
  message: string
  date: string

  constructor( email: string, date: string, message: string) {
    this.email = email;
    this.message = message;
    this.date = date;
  }

  /**
   * Función para declarar un nuevo objeto tipo producto para ser usado en la creación del
   * archivo, si ya hay un archivo con productos se añade uno nuevo aumentando el id, si no hay
   * un archivo, retorna un objeto con el producto y el id establecido en 1
   * 
   * @returns {Object}
   */
  
  jsonToSave(){
    try{
      const data = fs.readFileSync('./Mensajes.txt', 'utf-8');
      let dataFromProducto = JSON.parse(data);
      dataFromProducto.push({
        id: (dataFromProducto.length + 1),
        email: this.email,
        date: this.date,
        message: this.message,
      })
      return dataFromProducto
    }catch {
      return [{
        id: 1,
        email: this.email,
        date: this.date,
        message: this.message,
      }]
    }
  }

  async guardar() {

    try{
      fs.writeFileSync('./Mensajes.txt', JSON.stringify(this.jsonToSave()))
      console.log(`Archivo guardado`)
    } catch(err) {
      console.log(err)
    }
  }
}

export class ArchivoLeer {

  constructor() {
  }

  async leer() {
    try {
      const data = await fs.readFileSync('./Mensajes.txt', 'utf-8')
      console.log(data);
      return data;
    } catch (error) {
      console.log([]);
      return [];
    }
    
  }
}
