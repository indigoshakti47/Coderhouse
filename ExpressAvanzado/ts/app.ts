import express, { Application, Request, Response } from "express";

import Productos from "./Producto";

const app: Application = express();

app.use(express.json())

let producto = new Productos([])

app.get('/api/productos', async (req: Request, res: Response) => {

  try{
    res.send(producto.recuperarTodo())
  } catch(err) {
    console.log(err)
  }

})

app.get('/api/productos/:id', async (req: Request, res: Response) => {

  try {

    const id: number = parseInt(req.params.id);

    res.send(producto.recuperarUno(id))

  } catch(err) {
    console.log(err)
  }
  
})

app.post('/api/producto', async (req: Request, res: Response) => {

  try {

    const {title, price, thumbnail} = req.body 
    res.send(producto.guardar(producto.recuperarCantidad(), title, price, thumbnail))

  } catch(err) {
    console.log(err)
  }
})

app.listen(8080, () => {
  console.log(`El servidor está corriendo en el puerto 8080`)
})