import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { withRouter } from "react-router";
import { useHistory } from 'react-router-dom';
import { loginApi } from "../api/user"

const LoginApp = () => {
  const history = useHistory();
  const [name, setName] = useState("")

  const submitLogin = async() => {
    if(name){
      const login = await loginApi(name)
      console.log(login)
      history.push("/insert");
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

        <Button variant="primary" onClick={() => submitLogin()}>
          Ingresar
        </Button>
      </Form>
    </>
  );
};
const Login = withRouter(LoginApp);
export default Login