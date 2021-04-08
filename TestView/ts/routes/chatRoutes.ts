import express, { Request, Response } from "express";
import { ChatRepository } from "../repository/chat.repository";

const router = express.Router()

const Chat: ChatRepository = new ChatRepository();

router.get('/chat', async (req: Request, res: Response) => {
  const messages = await Chat.leer()
  console.log(messages, 1)
  const msg = messages.map((mes: any) => {
    console.log(mes)
    const date: Date = mes.date
    console.log(date.toISOString().split("T")[0])
    return(
      {
        id: mes._id,
        email: mes.email,
        message: mes.message,
        date: `${date.toISOString().split("T")[0]} ${date.toISOString().split("T")[1].split(".")[0]}`
      }
    )
  })
  res.render('chat', {messages: msg})
})

export {router}