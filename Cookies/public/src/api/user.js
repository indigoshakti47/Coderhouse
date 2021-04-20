export async function loginApi(name) {
  const url = `http://localhost:8080/api/login?name=${name}`
  
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: 'include',
  }

  try {
    const response = await fetch(url, params);

    return response.text();
  } catch (err) {
    return err;
  }
}
export async function logoutApi() {
  const url = `http://localhost:8080/api/logout`
  
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: 'include',
  }

  try {
    const response = await fetch(url, params);

    return response.text();
  } catch (err) {
    return err;
  }
}