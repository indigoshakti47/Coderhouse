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
const operations_1 = __importDefault(require("./operations/"));
const operacion = (numA, numB, op) => __awaiter(void 0, void 0, void 0, function* () {
    let operation = null;
    switch (op) {
        case 'suma':
            operation = operations_1.default.Suma;
            break;
        case 'resta':
            operation = operations_1.default.Resta;
            break;
        default:
            return console.log('No existe esa operación');
    }
    return new operation(numA, numB).resultado();
});
const operaciones = (numA, numB, op) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield operacion(numA, numB, op);
    console.log(result);
});
operaciones(1, 2, 'resta');
