import express, { Application, Request, Response } from "express";
import pug from "pug";
import path from "path";

import {router as productRoutes, producto} from "./routes/productRoutes"

//const pugApp = pug();
const app: Application = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api', productRoutes)

app.set('views', './views')
app.set('view engine', 'pug')

app.get('/productos/vista', (req: Request, res: Response) => {

  const data = producto.recuperarTodo()
  const cantidad = producto.recuperarCantidad()

  let empty = false
  
  if(cantidad === 0) empty = true
  res.render('main.pug', {data, empty})
})

app.use(express.static(path.join(__dirname, './../public')))

app.listen(8080, () => {
  console.log(`El servidor está corriendo en el puerto 8080`)
})