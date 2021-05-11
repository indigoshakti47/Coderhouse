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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRepository = void 0;
const mongo_db_1 = require("../database/mongo.db");
class ChatRepository {
    constructor() {
    }
    guardarMensaje(email, date, message, nombre, apellido, alias, avatar, edad) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = new mongo_db_1.Chat({
                    author: {
                        id: email,
                        nombre,
                        apellido,
                        edad,
                        alias,
                        avatar
                    },
                    text: { text: message, date }
                });
                console.log(`Mensaje guardado`);
                return data.save();
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    leer() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mensajes = yield mongo_db_1.Chat.find({}).lean();
                return mensajes;
            }
            catch (error) {
                console.log([]);
                return [];
            }
        });
    }
}
exports.ChatRepository = ChatRepository;
