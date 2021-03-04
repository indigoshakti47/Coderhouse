import express, { Request, Response } from "express";

import Productos from "../Producto";

const router = express.Router()

let producto = new Productos([])

router.get('/productos', async (req: Request, res: Response) => {

  try{
    res.send(producto.recuperarTodo())
  } catch(err) {
    console.log(err)
  }

})

router.get('/productos/:id', async (req: Request, res: Response) => {

  try {

    const id: number = parseInt(req.params.id);

    res.send(producto.recuperarUno(id))

  } catch(err) {
    console.log(err)
  }
  
})

router.post('/producto', async (req: Request, res: Response) => {

  try {

    const {title, price, thumbnail} = req.body 
    res.send(producto.guardar(producto.recuperarCantidad(), title, price, thumbnail))

  } catch(err) {
    console.log(err)
  }
})

router.post('/producto/vista', async (req: Request, res: Response) => {

  try {

    const {title, price, thumbnail} = req.body 
    producto.guardar(producto.recuperarCantidad(), title, price, thumbnail)
    res.redirect('/')

  } catch(err) {
    console.log(err)
  }
})

router.put('/producto/:id', async(req: Request, res: Response) => {
  try {

    const id: number = parseInt(req.params.id)
    const {title, price, thumbnail} : { title: string; price: number; thumbnail: string } = req.body 

    producto.actualizarUno(id, title, price, thumbnail)

    res.send({title, price, thumbnail})
  } catch(err) {
    console.log(err)
  }
})

router.delete('/producto/:id', async(req: Request, res: Response) => {
  try {
    const id : number = parseInt(req.params.id)

    const deletedProduct = producto.eliminarUno(id)

    res.send(deletedProduct)
    
  } catch (error) {
    console.log(error)
  }
})

export {router, producto}