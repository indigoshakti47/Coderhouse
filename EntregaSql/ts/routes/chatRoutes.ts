import express, { Request, Response } from "express";
import { ChatRepository } from "../repository/chat.repository";

const router = express.Router()

const Chat: ChatRepository = new ChatRepository();

router.get('/chat', async (req: Request, res: Response) => {
  const messages = await Chat.leer()
  console.log(messages)
  res.render('chat', {messages})
})

export {router}