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
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const chat_repository_1 = require("../repository/chat.repository");
const normalizr_1 = require("normalizr");
const router = express_1.default.Router();
exports.router = router;
const Chat = new chat_repository_1.ChatRepository();
const author = new normalizr_1.schema.Entity('author', {}, { idAttribute: 'email' });
const text = new normalizr_1.schema.Entity('text');
const mensaje = new normalizr_1.schema.Entity('mensajes', {
    author,
    text
});
router.get('/chat', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const messages = yield Chat.leer();
    const normalizedData = normalizr_1.normalize(messages, mensaje);
    console.log(normalizedData);
    console.log(messages, 1);
    const msg = messages.map((mes) => {
        const date = mes.date;
        return ({
            id: mes._id,
            email: mes.email,
            message: mes.message,
            date: `${date.toISOString().split("T")[0]} ${date.toISOString().split("T")[1].split(".")[0]}`
        });
    });
    res.render('chat', { messages: msg });
}));
