"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cat = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
mongoose_1.default.connect('mongodb+srv://nathalia:Ab12345@cluster0.puyxs.mongodb.net/ecommerce?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const blogSchema = new Schema({
    name: String
});
exports.Cat = mongoose_1.default.model('Cat', blogSchema);
