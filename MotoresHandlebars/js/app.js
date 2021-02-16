"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const path_1 = __importDefault(require("path"));
const productRoutes_1 = require("./routes/productRoutes");
const app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api', productRoutes_1.router);
app.engine("hbs", express_handlebars_1.default({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/../views/layouts",
    partialsDir: __dirname + "/../views/partials"
}));
app.set('views', './views');
app.set('view engine', 'hbs');
app.get('/productos/vista', (req, res) => {
    const data = productRoutes_1.producto.recuperarTodo();
    const cantidad = productRoutes_1.producto.recuperarCantidad();
    let empty = false;
    if (cantidad === 0)
        empty = true;
    res.render('main', { data, empty });
});
app.use(express_1.default.static(path_1.default.join(__dirname, './../public')));
app.listen(8080, () => {
    console.log(`El servidor está corriendo en el puerto 8080`);
});
