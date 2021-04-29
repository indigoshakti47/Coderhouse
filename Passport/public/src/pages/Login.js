import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { withRouter } from "react-router";
import { useHistory } from 'react-router-dom';
import { loginApi } from "../api/user"

const LoginApp = () => {
  const history = useHistory();
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

  const submitLogin = async() => {
    if(name){
      const login = await loginApi(name, password)
      console.log(login)
      if(login == "Unauthorized") alert("No existe tu cuenta")
      else history.push("/insert");
    } else alert("Necesitas ingresar un nombre")
  }

  console.log(name)
  return (
    <>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" placeholder="Ingresa tu nombre" onChange={(e) => setName(e.target.value)}/>
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Password</Form.Label>
          <Form.Control type="text" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)}/>
        </Form.Group>

        <Button variant="primary" onClick={() => submitLogin()}>
          Ingresar
        </Button>
        <a href="/signup" onClick={() => history.push("/signup")}>Registrarse</a>
      </Form>
    </>
  );
};
const Login = withRouter(LoginApp);
export default Login