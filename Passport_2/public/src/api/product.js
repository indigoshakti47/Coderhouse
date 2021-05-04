import Cookies from 'js-cookie';
import { logoutApi } from "./user"
import { useHistory } from 'react-router-dom';

export async function insertProduct(productData) {
  const url = 'http://localhost:8080/api/productos/agregar'
  
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(productData)
  }

  try {
    const response = await fetch(url, params);
    if (response.status === 200){
      return response.json();
    }
    return response.text();
  } catch (err) {
    return err;
  }
}

export async function getProductsApi() {
  const url = 'http://localhost:8080/api/productos/listar'
  
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }

  try {
    if(Cookies.get('username')){
      const response = await fetch(url, params);
      if (response.status === 200){
        return response.json();
      }
      return response.text();
    } else {
      await logoutApi()
      return 'expired'
    }
  } catch (err) {
    return err;
  }
}

export async function deleteProductApi(id) {
  const url = 'http://localhost:8080/api/productos/borrar/' + id
  
  const params = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  }

  try {
    const response = await fetch(url, params);
    console.log(response)
    if (response.status === 200){
      return response.json();
    }
    return response.text();
  } catch (err) {
    return err;
  }
}

export async function updateProductApi(id, productData) {
  const url = 'http://localhost:8080/api/productos/actualizar/' + id
  
  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(productData)
  }

  try {
    const response = await fetch(url, params);
    return response.json();
  } catch (err) {
    return err;
  }
}