"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = exports.Chat = exports.Product = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
mongoose_1.default.connect('mongodb+srv://nathalia:micontrasena@cluster0.puyxs.mongodb.net/ecommerce?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const productSchema = new Schema({
    timestampp: { type: Date, default: Date.now },
    nombre: String,
    descripcion: String,
    codigo: String,
    foto: String,
    precio: Number,
    stock: Number,
});
exports.Product = mongoose_1.default.model('Product', productSchema);
const chatSchema = new Schema({
    author: {
        id: String,
        nombre: String,
        apellido: String,
        edad: String,
        alias: String,
        avatar: String
    },
    text: { text: String, date: { type: Date, default: Date.now } },
});
exports.Chat = mongoose_1.default.model('Chat', chatSchema);
const sessionSchema = new Schema({
    expires: String,
    session: String
});
exports.Session = mongoose_1.default.model('session', sessionSchema);
