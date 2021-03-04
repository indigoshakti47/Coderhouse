import express, { Request, Response } from "express";

import {producto} from "./productRoutes";
import { ArchivoLeer } from "../Archivo";

const router = express.Router()

router.get('/productos/vista', (req: Request, res: Response) => {

  const data = producto.recuperarTodo()
  const cantidad = producto.recuperarCantidad()

  let empty = false
  
  if(cantidad === 0) empty = true
  res.render('main', {data, empty})
})

router.get('/chat', async (req: Request, res: Response) => {
  const leer = await new ArchivoLeer().leer()
  const file = typeof(leer) === "string" ? JSON.parse(leer) : leer
  res.render('chat', {file})
})

export default router