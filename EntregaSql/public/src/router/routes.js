import InsertProduct from '../pages/InsertProduct';


// Este es un arreglo donde irán todas las rutas de nuestra App ;) - :D
const ROUTES = [
  {
    path: ['/'], // could be an array or a string
    key: 'INSERT_PRODUCT',
    exact: true,
    component: InsertProduct,
    auth: false,
  }
];

export default ROUTES;
