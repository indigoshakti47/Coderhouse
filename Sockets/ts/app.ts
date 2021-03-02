import express, { Application } from "express";
import handlebars from "express-handlebars";
import path from "path";

import {router as productRoutes, producto} from "./routes/productRoutes"
import viewRoutes from "./routes/viewRoutes"
import { ArchivoGuardar } from "./Archivo";

const app: Application = express();

//Socket configuration setup
const http = require("http").Server(app);
let io = require("socket.io")(http);

io.on("connection", function(socket: any) {
  //Productos
  socket.on("product", function(product: any) {
    producto.guardar(producto.recuperarCantidad(), product.title, product.price, product.thumbnail)
    io.emit("productadded", producto.recuperarUno(producto.recuperarCantidad()-1))
  });
  //Chat
  socket.on('chat:message', async (data: any) => {
    console.log(data)
    const ArchivoHandler: ArchivoGuardar = new ArchivoGuardar(data.email, data.date, data.message);

    await ArchivoHandler.guardar()
    
    io.emit('chat:message', data)
  })
});

//API setup
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, './../public')))

app.use('/api', productRoutes)
app.use(viewRoutes)


app.engine("hbs", handlebars({

  extname:".hbs",
  defaultLayout: "index.hbs",
  layoutsDir: __dirname+"/../views/layouts",
  partialsDir: __dirname+"/../views/partials"

}))

app.set('views', './views')
app.set('view engine', 'hbs')

http.listen(8080, () => {
  console.log("El servidor está corriendo en el puerto 8080");
});