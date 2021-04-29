import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { withRouter } from "react-router";
import { useHistory } from 'react-router-dom';
import { signupApi } from "../api/user"

const SignupApp = () => {
  const history = useHistory();
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

  const submitLogin = async() => {
    if(name){
      const login = await signupApi(name, password)
      console.log(login)
      if(login == "Unauthorized") alert("Esta cuenta ya existe")
      else history.push("/insert");
    } else alert("Necesitas ingresar un nombre")
  }

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
          Registrar
        </Button>
        <a href="/" onClick={() => history.push("/")}>Ingresar</a>
      </Form>
    </>
  );
};
const SignUp = withRouter(SignupApp);
export default SignUp