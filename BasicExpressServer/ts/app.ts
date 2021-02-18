import express, {Application, Request, Response} from "express";
import fs from "fs";

const app: Application = express();

let useRouteOne:number = 0;
let useRouteTwo:number = 0;

interface Producto {
  id: Number,
  title: String,
  price: Number,
  thumbnail: String
}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

app.get('/items', async (req: Request, res: Response) => {
  await fs.readFile('./productos.txt', 'utf-8', (error, data) => {
    if(error){
      res.status(404).send("Error leyendo el archivo")
      console.log(error);
    } else {
      let dataItems: Array<Producto> = JSON.parse(data) || []
      useRouteOne += 1
      res.status(200).send({items: dataItems, cantidad: dataItems.length})
    }
  }); 
})

app.get('/item-random', async (req: Request, res: Response) => {
  await fs.readFile('./productos.txt', 'utf-8', (error, data) => {
    if(error){
      res.status(404).send("Error leyendo el archivo")
      console.log(error);
    } else {
      let dataItems: Array<Producto> = JSON.parse(data) || []

      let randomNumber: number = getRandomInt(0, dataItems.length - 1)
      useRouteTwo += 1
      res.status(200).send({item: dataItems[randomNumber]})
    }
  });
})

app.get('/visitas', (req: Request, res: Response) => {
  try{
    res.status(200).send({visitas: {
      items: useRouteOne,
      item: useRouteTwo
    }})
  } catch(err) {
    console.log(err)
  }
})

app.listen(8080, () => {
  console.log("Servidor escuchando en el puerto 8080")
}) 