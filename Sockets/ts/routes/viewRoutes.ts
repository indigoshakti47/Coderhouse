import express, { Request, Response } from "express";

import {producto} from "./productRoutes";

const router = express.Router()

router.get('/vista', (req: Request, res: Response) => {

  const data = producto.recuperarTodo()
  const cantidad = producto.recuperarCantidad()

  let empty = false
  
  if(cantidad === 0) empty = true
  res.render('main', {data, empty})
})

export default router