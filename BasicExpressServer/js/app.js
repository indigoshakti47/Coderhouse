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
const fs_1 = __importDefault(require("fs"));
const app = express_1.default();
let useRouteOne = 0;
let useRouteTwo = 0;
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
app.get('/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield fs_1.default.readFile('./productos.txt', 'utf-8', (error, data) => {
        if (error) {
            res.status(404).send("Error leyendo el archivo");
            console.log(error);
        }
        else {
            let dataItems = JSON.parse(data) || [];
            useRouteOne += 1;
            res.status(200).send({ items: dataItems, cantidad: dataItems.length });
        }
    });
}));
app.get('/item-random', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield fs_1.default.readFile('./productos.txt', 'utf-8', (error, data) => {
        if (error) {
            res.status(404).send("Error leyendo el archivo");
            console.log(error);
        }
        else {
            let dataItems = JSON.parse(data) || [];
            let randomNumber = getRandomInt(0, dataItems.length - 1);
            useRouteTwo += 1;
            res.status(200).send({ item: dataItems[randomNumber] });
        }
    });
}));
app.get('/visitas', (req, res) => {
    try {
        res.status(200).send({ visitas: {
                items: useRouteOne,
                item: useRouteTwo
            } });
    }
    catch (err) {
        console.log(err);
    }
});
app.listen(8080, () => {
    console.log("Servidor escuchando en el puerto 8080");
});
