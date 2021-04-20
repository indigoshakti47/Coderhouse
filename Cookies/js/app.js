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
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const productRoutes_1 = require("./routes/productRoutes");
const carritoRoutes_1 = require("./routes/carritoRoutes");
const chatRoutes_1 = require("./routes/chatRoutes");
const userRoutes_1 = require("./routes/userRoutes");
const chat_repository_1 = require("./repository/chat.repository");
const app = express_1.default();
app.use(express_1.default.static(path_1.default.join(__dirname, './../public/build')));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cors_1.default());
app.use(cookie_parser_1.default());
app.use(cookie_session_1.default({
    name: 'session',
    secret: "booboo",
    httpOnly: true,
    path: "/",
    domain: "localhost"
    // Cookie Options
}));
//Socket configuration setup
const http = require("http").Server(app);
let io = require("socket.io")(http);
const Chat = new chat_repository_1.ChatRepository();
io.on("connection", function (socket) {
    //Chat
    socket.on('chat:message', (data) => __awaiter(this, void 0, void 0, function* () {
        console.log(data);
        const { email, date, message, nombre, apellido, alias, avatar, edad } = data;
        yield Chat.guardarMensaje(email, date, message, nombre, apellido, alias, avatar, edad);
        io.emit('chat:message', data);
    }));
});
app.use('/api/productos', productRoutes_1.router);
app.use('/api/carrito', carritoRoutes_1.router);
app.use('/api', userRoutes_1.router);
app.use(chatRoutes_1.router);
const port = parseInt(process.env.PORT) || 8080;
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
