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
exports.Suma = exports.Resta = void 0;
class Resta {
    constructor(number1, number2) {
        this.number1 = number1;
        this.number2 = number2;
    }
    resultado() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.number1 - this.number2;
        });
    }
}
exports.Resta = Resta;
class Suma {
    constructor(number1, number2) {
        this.number1 = number1;
        this.number2 = number2;
    }
    resultado() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.number1 + this.number2;
        });
    }
}
exports.Suma = Suma;
