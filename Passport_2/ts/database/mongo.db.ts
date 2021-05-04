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
  author: {
    id: String,
    nombre: String,
    apellido: String,
    edad: String,
    alias: String,
    avatar: String
  },
  text: {text: String, date: { type: Date, default: Date.now }},
});

export const Chat = mongoose.model('Chat', chatSchema);

const sessionSchema = new Schema({
  expires: String,
  session: String
});

export const Session = mongoose.model('session', sessionSchema);

const userSchema = new Schema({
  facebookId: String,
  username: String,
  password: String,
  email: String,
  photo: String
});

export const User = mongoose.model('users', userSchema);
