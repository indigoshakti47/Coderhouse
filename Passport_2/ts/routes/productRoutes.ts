import express, { Request, Response } from "express";
import { createFakeData } from "../mock-server/mock-server";

import Productos from "../service/Producto";

const router = express.Router()

let producto = new Productos()

interface Producto {
  nombre: string, 
  descripcion: string, 
  codigo: string, 
  foto: string, 
  precio: number, 
  stock: number
}

router.get('/vista-test', async (req: Request, res: Response) => {

  try {

    const cant: any = req.query.cant?.toString();

    const products = createFakeData(cant)
    let empty: boolean = false

    console.log(products, empty)
    if(products.length === 0) empty = true
    res.render('main', {products, empty})
  } catch(err) {
    console.log(err)
  }
  
})


router.get('/listar/:id?', async (req: Request, res: Response) => {

  try {

    const id: string = req.params.id;

    console.log(req.cookies.name, 1)
    res.cookie('name', req.cookies.name, {expires  : new Date(Date.now() + 1000 * 60), httpOnly: false})

    if(id) res.send(await producto.recuperarUno(id));
    if(!id) res.send(await producto.recuperarTodo())

  } catch(err) {
    console.log(err)
  }
  
})

router.post('/agregar', async (req: Request, res: Response) => {

  try {

    console.log(req.body)
    const {nombre, descripcion, codigo, foto, precio, stock}: Producto = req.body 
    res.send(await producto.guardar(nombre, descripcion, codigo, foto, precio, stock))

  } catch(err) {
    console.log(err)
  }
})

router.put('/actualizar/:id', async(req: Request, res: Response) => {
  try {

    const id: string = req.params.id
    const {nombre, descripcion, codigo, foto, precio, stock} : Producto = req.body 

    await producto.actualizarUno(id, nombre, descripcion, codigo, foto, precio, stock)

    res.send({nombre, descripcion, codigo, foto, precio, stock})
  } catch(err) {
    console.log(err)
  }
})

router.delete('/borrar/:id', async(req: Request, res: Response) => {
  try {
    const id : string = req.params.id

    const deletedProduct = await producto.eliminarUno(id)

    res.send(deletedProduct)
    
  } catch (error) {
    console.log(error)
  }
})

export {router}