import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { withRouter } from "react-router";
import { useHistory } from 'react-router-dom';
import { loginApi } from "../api/user"

const LoginApp = () => {
  return (
    <>
      <Form>
        <a href="http://localhost:8080/api/auth/facebook" class="btn btn-primary"><span class="fa fa-facebook"></span> Login with Facebook</a>
      </Form>
    </>
  );
};
const Login = withRouter(LoginApp);
export default Login