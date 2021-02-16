import express, { Application, Request, Response } from "express";
import handlebars from "express-handlebars";
import path from "path";

import {router as productRoutes, producto} from "./routes/productRoutes"

const app: Application = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api', productRoutes)

app.engine("hbs", handlebars({

  extname:".hbs",
  defaultLayout: "index.hbs",
  layoutsDir: __dirname+"/../views/layouts",
  partialsDir: __dirname+"/../views/partials"

}))

app.set('views', './views')
app.set('view engine', 'hbs')

app.get('/productos/vista', (req: Request, res: Response) => {

  const data = producto.recuperarTodo()
  const cantidad = producto.recuperarCantidad()

  let empty = false
  
  if(cantidad === 0) empty = true
  res.render('main', {data, empty})
})

app.use(express.static(path.join(__dirname, './../public')))



app.listen(8080, () => {
  console.log(`El servidor está corriendo en el puerto 8080`)
})