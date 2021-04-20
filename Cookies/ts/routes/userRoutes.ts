import express, { Request, Response } from "express";

const router = express.Router()

router.post('/login', async (req: Request, res: Response) => {

  try {

    const { name } = req.query
    res.cookie('name', name, {expires  : new Date(Date.now() + 1000 * 60), httpOnly: false}).send(`Usuario ${name} loggeado`)

    console.log(req.cookies)
  } catch(err) {
    console.log(err)
  }
  
})
router.post('/logout', async (req: Request, res: Response) => {

  try {

    res.clearCookie('name').send(`Hasta luego`)

  } catch(err) {
    console.log(err)
  }
  
})

export {router}