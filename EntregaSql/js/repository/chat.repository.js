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
exports.ChatRepository = void 0;
const knex_1 = __importDefault(require("knex"));
const sqlite_db_1 = require("../database/sqlite.db");
const knexConnection = knex_1.default(sqlite_db_1.sqliteConfig);
class ChatRepository {
    constructor() {
    }
    crearTabla() {
        knexConnection.schema.hasTable('chat').then(function (exists) {
            if (!exists) {
                return knexConnection.schema.createTable('chat', table => {
                    table.increments("id").primary().notNullable();
                    table.string("email");
                    table.string("date");
                    table.string("message");
                })
                    .then(() => console.log("Table created"))
                    .finally(() => knexConnection.destroy());
            }
        });
    }
    guardarMensaje(email, date, message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = knexConnection.from("chat").insert({
                    email,
                    date,
                    message
                });
                console.log(`Mensaje guardado`);
                return data;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    leer() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mensajes = yield knexConnection.from("chat").select("*");
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
