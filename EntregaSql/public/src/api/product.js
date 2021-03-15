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