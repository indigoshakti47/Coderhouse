import mongoose from 'mongoose';

const {Schema} = mongoose

mongoose.connect('mongodb+srv://nathalia:micontrasena@cluster0.puyxs.mongodb.net/ecommerce?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

const productSchema = new Schema({
  timestampp: { type: Date, default: Date.now },
  nombre: String,
  descripcion: String,
  codigo: String,
  foto: String,
  precio: Number,
  stock: Number,
});


export const Product = mongoose.model('Product', productSchema);

const chatSchema = new Schema({
  email: String,
  date: { type: Date, default: Date.now },
  message: String,
});

export const Chat = mongoose.model('Chat', chatSchema);