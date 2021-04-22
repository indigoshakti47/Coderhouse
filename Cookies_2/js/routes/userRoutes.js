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
const mongo_db_1 = require("../database/mongo.db");
const router = express_1.default.Router();
exports.router = router;
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.query;
        req.session.user = { 'name': name };
        req.session.cookie.expires = new Date(Date.now() + 10000 * 60);
        res.cookie('name', req.session.user, { expires: new Date(Date.now() + 10000 * 60), httpOnly: false }).send(`Usuario ${name} loggeado`);
        console.log(req.session);
    }
    catch (err) {
        console.log(err);
    }
}));
router.post('/logout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie('name');
        req.session.destroy(err => {
            if (err) {
                console.log(err);
            }
            else {
                res.send(`Hasta luego`);
            }
        });
    }
    catch (err) {
        console.log(err);
    }
}));
router.get('/session', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        const data = yield mongo_db_1.Session.find({ id: id });
        res.send(data);
    }
    catch (err) {
        console.log(err);
    }
}));
