import InsertProduct from '../pages/InsertProduct';
import ListProducts from '../pages/ListProducts';
import Cart from '../pages/Cart';


// Este es un arreglo donde irán todas las rutas de nuestra App ;) - :D
const ROUTES = [
  {
    path: ['/'], // could be an array or a string
    key: 'INSERT_PRODUCT',
    exact: true,
    component: InsertProduct,
    auth: false,
  },
  {
    path: ['/list'], // could be an array or a string
    key: 'LIST_PRODUCT',
    exact: true,
    component: ListProducts,
    auth: false,
  },
  {
    path: ['/cart'], // could be an array or a string
    key: 'CART',
    exact: true,
    component: Cart,
    auth: false,
  }
];

export default ROUTES;
