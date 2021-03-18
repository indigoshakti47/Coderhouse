"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const productRoutes_1 = require("./routes/productRoutes");
const carritoRoutes_1 = require("./routes/carritoRoutes");
const chatRoutes_1 = require("./routes/chatRoutes");
const product_repository_1 = require("./repository/product.repository");
const chat_repository_1 = require("./repository/chat.repository");
const app = express_1.default();
app.use(express_1.default.static(path_1.default.join(__dirname, './../public/build')));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cors_1.default());
//Socket configuration setup
const http = require("http").Server(app);
let io = require("socket.io")(http);
const Chat = new chat_repository_1.ChatRepository();
Chat.crearTabla();
io.on("connection", function (socket) {
    //Chat
    socket.on('chat:message', (data) => __awaiter(this, void 0, void 0, function* () {
        console.log(data);
        yield Chat.guardarMensaje(data.email, data.date, data.message);
        io.emit('chat:message', data);
    }));
});
app.use('/api/productos', productRoutes_1.router);
app.use('/api/carrito', carritoRoutes_1.router);
app.use(chatRoutes_1.router);
const port = parseInt(process.env.PORT) || 8080;
//Crea la tabla productos si no existe
new product_repository_1.ProductoRepository().crearTabla();
app.engine("hbs", express_handlebars_1.default({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/../views/layouts",
    partialsDir: __dirname + "/../views/partials"
}));
app.set('views', './views');
app.set('view engine', 'hbs');
http.listen(port, () => {
    console.log(`El servidor está corriendo en el puerto ${port}`);
});
