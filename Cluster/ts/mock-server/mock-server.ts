import faker from "faker";

export function createFakeData(cant: any = 10): Array<any> {
  let products: Array<any> = []
  for(let i = 0; i < cant; i++){
    const product = {
      nombre: faker.commerce.productName(),
      precio: faker.commerce.price(1,500),
      foto: faker.image.imageUrl()
    }
    products.push(product)
  }
  return products;
}