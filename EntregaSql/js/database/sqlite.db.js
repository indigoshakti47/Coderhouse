"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqliteConfig = void 0;
exports.sqliteConfig = {
    client: "sqlite3",
    connection: {
        filename: "./chat.sqlite"
    },
    useNullAsDefault: true
};
