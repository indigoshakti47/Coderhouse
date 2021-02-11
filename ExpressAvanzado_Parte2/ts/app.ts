import express, { Application } from "express";
import path from "path";

import productRoutes from "./routes/productRoutes"

const app: Application = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, './../public')))
app.use('/api', productRoutes)

app.listen(8080, () => {
  console.log(`El servidor está corriendo en el puerto 8080`)
})