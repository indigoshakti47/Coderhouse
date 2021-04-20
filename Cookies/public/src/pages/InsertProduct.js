import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { withRouter } from "react-router";
import Sidebar from "../Components/Sidebar";
import {insertProduct} from "../api/product";
import {logoutApi} from "../api/user";
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';

const Dash = () => {
  const history = useHistory();
  const [name, setName] = useState(Cookies.get('name'))
  const [productData, setProductData] = useState({
    nombre: "",
    descripcion: "",
    codigo: "",
    foto: "",
    precio: 0,
    stock: 0
  })

  useEffect(() => {
    if(!name) history.push('/')
  }, [])
  
  const submitForm = async () => {
    console.log(productData)
    const response = await insertProduct(productData);

    setProductData({nombre: "",
    descripcion: "",
    codigo: "",
    foto: "",
    precio: 0,
    stock: 0})
    console.log(response)
  }

  const logout = async () => {
    const response = await logoutApi()
    alert(`${response} ${name}`)
    setName(null)
    history.push('/')
  }
  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={2} id="sidebar-wrapper">
            <Sidebar />
          </Col>
          <Col xs={10} id="page-content-wrapper">
            <Row>
              <Col xs={8}>
                <h1>Hola {name}</h1>
              </Col>
              <Col xs={4}>
                <Button onClick={() => logout()}>Salir</Button>
              </Col>

            </Row>
            <Form>
              <div className="form-group">
                <label for="Name">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="Nombre"
                  name="title"
                  value={productData.nombre}
                  onChange={(e) => {
                    setProductData({
                      ...productData,
                      nombre: e.target.value
                    })
                  }}
                />
              </div>
              <div className="form-group">
                <label for="description">Descripción</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  placeholder="Descripción"
                  name="description"
                  value={productData.descripcion}
                  onChange={(e) => {
                    setProductData({
                      ...productData,
                      descripcion: e.target.value
                    })
                  }}
                />
              </div>
              <div className="form-group">
                <label for="codigo">Código</label>
                <input
                  type="text"
                  className="form-control"
                  id="codigo"
                  placeholder="Código"
                  name="codigo"
                  value={productData.codigo}
                  onChange={(e) => {
                    setProductData({
                      ...productData,
                      codigo: e.target.value
                    })
                  }}
                />
              </div>
              <div className="form-group">
                <label for="foto">Foto</label>
                <input
                  type="text"
                  className="form-control"
                  id="foto"
                  placeholder="Foto"
                  name="foto"
                  value={productData.foto}
                  onChange={(e) => {
                    setProductData({
                      ...productData,
                      foto: e.target.value
                    })
                  }}
                />
              </div>
              <div className="form-group">
                <label for="Name">Precio</label>
                <input
                  type="number"
                  className="form-control"
                  id="Precio"
                  placeholder="Precio"
                  name="Precio"
                  value={productData.precio}
                  onChange={(e) => {
                    setProductData({
                      ...productData,
                      precio: parseInt(e.target.value)
                    })
                  }}
                />
              </div>
              <div className="form-group">
                <label for="Name">Stock</label>
                <input
                  type="number"
                  className="form-control"
                  id="Stock"
                  placeholder="Stock"
                  name="Stock"
                  value={productData.stock}
                  onChange={(e) => {
                    setProductData({
                      ...productData,
                      stock: parseInt(e.target.value)
                    })
                  }}
                />
              </div>
              <div className="form-group">
              <Button
                type="submit"
                className="btn btn-primary"
                href="#p"
                onClick={() => submitForm()}
              >
                Ingresar producto
              </Button>
              </div>
              
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
const Dashboard = withRouter(Dash);
export default Dashboard