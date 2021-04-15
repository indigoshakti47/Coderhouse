import express, { Request, Response } from "express";
import { ChatRepository } from "../repository/chat.repository";
import { normalize, schema } from "normalizr";

const router = express.Router()

const Chat: ChatRepository = new ChatRepository();

const author = new schema.Entity('author', {}, {idAttribute: 'id'});
const text = new schema.Entity('text', {}, {idAttribute: 'date'});

const mensaje = new schema.Entity('mensajes', {
  author: author,
  text: text
}, {idAttribute: '_id'})

router.get('/chat', async (req: Request, res: Response) => {
  const messages = await Chat.leer()

  const normalizedData = normalize(messages, [mensaje])
  res.render('chat', {messages: JSON.stringify(normalizedData)})
})

export {router}