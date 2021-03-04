"use strict";

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = undefined && undefined.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_handlebars_1 = __importDefault(require("express-handlebars"));
var path_1 = __importDefault(require("path"));
var productRoutes_1 = require("./routes/productRoutes");
var viewRoutes_1 = __importDefault(require("./routes/viewRoutes"));
var Archivo_1 = require("./Archivo");
var app = express_1.default();
//Socket configuration setup
var http = require("http").Server(app);
var io = require("socket.io")(http);
io.on("connection", function (socket) {
    var _this = this;

    //Productos
    socket.on("product", function (product) {
        productRoutes_1.producto.guardar(productRoutes_1.producto.recuperarCantidad(), product.title, product.price, product.thumbnail);
        io.emit("productadded", productRoutes_1.producto.recuperarUno(productRoutes_1.producto.recuperarCantidad() - 1));
    });
    //Chat
    socket.on('chat:message', function (data) {
        return __awaiter(_this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var ArchivoHandler;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            console.log(data);
                            ArchivoHandler = new Archivo_1.ArchivoGuardar(data.email, data.date, data.message);
                            _context.next = 4;
                            return ArchivoHandler.guardar();

                        case 4:
                            io.emit('chat:message', data);

                        case 5:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));
    });
});
//API setup
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, './../public')));
app.use('/api', productRoutes_1.router);
app.use(viewRoutes_1.default);
app.engine("hbs", express_handlebars_1.default({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/../views/layouts",
    partialsDir: __dirname + "/../views/partials"
}));
app.set('views', './views');
app.set('view engine', 'hbs');
http.listen(8080, function () {
    console.log("El servidor está corriendo en el puerto 8080");
});