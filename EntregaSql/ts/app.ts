import express, { Application } from "express";
import handlebars from "express-handlebars";
import cors from "cors";
import path from "path";

import {router as productRoutes} from "./routes/productRoutes"
import {router as carritoRoutes} from "./routes/carritoRoutes"
import {router as chatRoutes} from "./routes/chatRoutes"
import {ProductoRepository} from "./repository/product.repository"
import {ChatRepository} from "./repository/chat.repository"

const app: Application = express();

app.use(express.static(path.join(__dirname, './../public/build')))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors());

//Socket configuration setup
const http = require("http").Server(app);
let io = require("socket.io")(http);

const Chat: ChatRepository = new ChatRepository();
Chat.crearTabla();

io.on("connection", function(socket: any) {
  //Chat
  socket.on('chat:message', async (data: any) => {
    console.log(data)
    await Chat.guardarMensaje(data.email, data.date, data.message)
    
    io.emit('chat:message', data)
  })
});

app.use('/api/productos', productRoutes)
app.use('/api/carrito', carritoRoutes)
app.use(chatRoutes)

const port: number = parseInt(process.env.PORT!) || 8080

//Crea la tabla productos si no existe
new ProductoRepository().crearTabla()

app.engine("hbs", handlebars({
  
  extname:".hbs",
  defaultLayout: "index.hbs",
  layoutsDir: __dirname+"/../views/layouts",
  partialsDir: __dirname+"/../views/partials"
  
}))

app.set('views', './views')
app.set('view engine', 'hbs')

http.listen(port, () => {
  console.log(`El servidor está corriendo en el puerto ${port}`)
})