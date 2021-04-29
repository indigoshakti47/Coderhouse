export async function loginApi(username, password) {
  const url = `http://localhost:8080/api/login?username=${username}&password=${password}`
  
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

export async function signupApi(username, password) {
  const url = `http://localhost:8080/api/register?username=${username}&password=${password}`
  
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

export async function getSessionApi() {
  const url = `http://localhost:8080/api/session`
  
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }

  try {
    const response = await fetch(url, params);

    return response.text();
  } catch (err) {
    return err;
  }
}