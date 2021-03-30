import {Product} from "../database/mongo.db"
import mongoose from 'mongoose';
interface LooseObject {
  [key: string]: any
}
export class ProductoRepository {
  constructor() {

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
      const data = new Product({
        timestampp,
        nombre,
        descripcion,
        codigo,
        foto,
        precio,
        stock
      });
      console.log(`Producto guardado`)
      return await data.save();
    } catch (err) {
      console.log(err)
    }
  }

  async leer(id?: string) {
    try {
      console.log(id)
      let search = {};
      if(id) search = {_id: mongoose.Types.ObjectId(id)}
      const data = await Product.find(search)
      return await data;
    } catch (error) {
      console.log([]);
      return [];
    }
  }

  async eliminar(id: string) {
    try {
      console.log(id)
      await Product.deleteOne({ _id: mongoose.Types.ObjectId(id) });
      return id;
    } catch (error) {
      return error;
    }
  }


  async actualizar(id: string, nombre: string, descripcion: string, codigo: string, foto: string, precio: number, stock: number) {
    try {
      const updateData: LooseObject = {}
      if(nombre) updateData.nombre = nombre
      if(descripcion) updateData.descripcion = descripcion
      if(codigo) updateData.codigo = codigo
      if(foto) updateData.foto = foto
      if(precio) updateData.precio = precio
      if(stock) updateData.stock = stock
      const data = Product.updateOne({_id: mongoose.Types.ObjectId(id)}, updateData)
      return await data;
    } catch (error) {
      return error;
    }
  }
}

