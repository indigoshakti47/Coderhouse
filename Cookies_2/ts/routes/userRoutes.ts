import express, { Request, Response } from "express";
import { Session } from "../database/mongo.db"

const router = express.Router()

router.post('/login', async (req: Request, res: Response) => {

  try {

    const { name } = req.query
    req.session.user = {'name': name}
    req.session.cookie.expires = new Date(Date.now() + 10000 * 60)
    res.cookie('name', req.session.user, {expires  : new Date(Date.now() + 10000 * 60), httpOnly: false}).send(`Usuario ${name} loggeado`)
    console.log(req.session)
  } catch(err) {
    console.log(err)
  }
  
})


router.post('/logout', async (req: Request, res: Response) => {

  try {

    res.clearCookie('name')
    req.session.destroy(err => {
      if(err){
          console.log(err);
      } else {
          res.send(`Hasta luego`)
      }
  })
  } catch(err) {
    console.log(err)
  }
  
})

router.get('/session', async (req: Request, res: Response) => {

  try {

    const {id} = req.query;
    const data = await Session.find({id: id})
    res.send(data)
  } catch(err) {
    console.log(err)
  }
  
})

export {router}