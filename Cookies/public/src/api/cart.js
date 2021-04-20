export async function getCartApi() {
  const url = 'http://localhost:8080/api/carrito/listar/1'
  
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
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

export async function deleteCartProductApi(id) {
  const url = 'http://localhost:8080/api/carrito/borrar/' + 1
  const body = {
    id_producto: id
  }
  const params = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }

  try {
    const response = await fetch(url, params);
    if (response.status === 200){
      return response.json();
    }
    
  } catch (err) {
    return err;
  }
}
export async function addCartProductApi(id) {
  const url = 'http://localhost:8080/api/carrito/agregar/' + 1
  
  const body = {
    id_producto: id
  }
  const params = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }

  try {
    const response = await fetch(url, params);
    if (response.status === 200){
      return response.json();
    }
    
  } catch (err) {
    return err;
  }
}