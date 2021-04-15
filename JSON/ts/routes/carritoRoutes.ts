import express, { Request, Response } from "express";

import Carrito from "../service/Carrito";

const router = express.Router()

let carrito = new Carrito()

interface carrito {
  nombre: string, 
  descripcion: string, 
  codigo: string, 
  foto: string, 
  precio: number, 
  stock: number
}


router.get('/listar/:id?', async (req: Request, res: Response) => {

  try {

    const id: number = parseInt(req.params.id);

    if(id) res.send(await carrito.recuperarUno(id));
    if(!id) res.send(await carrito.recuperarTodo())

  } catch(err) {
    console.log(err)
  }
  
})

router.patch('/agregar/:id_carrito', async (req: Request, res: Response) => {

  try {
    const {id_producto} = req.body;
    const id_carrito: number = parseInt(req.params.id_carrito);    
    
    res.send(await carrito.guardarProducto(id_carrito, id_producto))

  } catch(err) {
    console.log(err)
  }
})

router.patch('/borrar/:id_carrito', async(req: Request, res: Response) => {
  try {
    const {id_producto} = req.body;
    const id_carrito: number = parseInt(req.params.id_carrito);

    const deletedProduct = await carrito.eliminarUno(id_carrito, id_producto)

    res.send(deletedProduct)
    
  } catch (error) {
    console.log(error)
  }
})

export {router}