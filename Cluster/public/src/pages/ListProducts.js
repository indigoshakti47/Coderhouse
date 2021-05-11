import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { withRouter } from "react-router";
import Sidebar from "../Components/Sidebar";
import Modal from "../Components/Modal/Modal";
import { getProductsApi, deleteProductApi } from "../api/product";
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import {logoutApi, getSessionApi} from "../api/user";

const Dash = () => {
  const history = useHistory();
  const [productData, setProductData] = useState([])
  const [name, setName] = useState(null)
  const [email, setEmail] = useState(null)
  const [photo, setPhoto] = useState(null)
  const [show, setShow] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

  useEffect(() => {
    getSession()
  }, [])

  const getSession = async() => {
    console.log(Cookies.get('session'))
    if(Cookies.get('session')){
      const id = Cookies.get('session').split(':')[1].split('.')[0]
      console.log(id)
      const response = await getSessionApi(id)
      if(JSON.parse(response).length > 0){
        const cookie = JSON.parse(JSON.parse(response)[0].session)
        console.log(cookie)
        setName(cookie.user.username)
        setEmail(cookie.user.email)
        setPhoto(cookie.user.photo)
        getProcucts()
      } 
    }
  }

  const handleShow = (index) => {
    console.log(index)
    setShow(true);
    setEditProductId(index)
  }

  const getProcucts = async () => {
    const response = await getProductsApi(productData);
    if(response === 'expired') history.push('/')
    else setProductData(response)

  }

  const deleteProducts = async (id, index) => {
    const response = await deleteProductApi(id);
    console.log(response)
    setProductData(productData.filter(function (product) { return product.id !== id; }))
  }

  const logout = async () => {
    const response = await logoutApi()
    alert(`${response} ${name}`)
    setName(null)
    history.push('/')
  }
  
  console.log(editProductId)
  return (
    <>

      <Container fluid>
        <Row>
          <Col xs={2} id="sidebar-wrapper">
            <Sidebar />
          </Col>

          <Col xs={10}>
            <Row>
              <Col xs={8}>
                <h1>Hola {name} - {email}</h1> <img src={photo}></img>
              </Col>
              <Col xs={4}>
                <Button onClick={() => logout()}>Salir</Button>
              </Col>

            </Row>
            <Row>
              {
                editProductId !== null &&
                <Modal show={show} setShow={setShow} product={productData[editProductId]} setProducts={setProductData}/>
              }
              {productData.length > 0 ? productData.map((product, index) => {
                return (
                  <Col xs={3} id="page-content-wrapper">
                    <Card style={{ width: '18rem' }}>
                      <ListGroup className="list-group-flush">
                        <ListGroupItem>Id {product.id}</ListGroupItem>
                        <ListGroupItem>Nombre {product.nombre}</ListGroupItem>
                        <ListGroupItem>Descripción {product.descripcion}</ListGroupItem>
                        <ListGroupItem>Código {product.codigo}</ListGroupItem>
                        <ListGroupItem><img src={product.foto} alt="image_" height="40px" /></ListGroupItem>
                        <ListGroupItem>Precio {product.precio}</ListGroupItem>
                        <ListGroupItem>Stock {product.stock}</ListGroupItem>
                      </ListGroup>
                      <Card.Body>
                        <Card.Link href="#" onClick={() => handleShow(index)}>Editar</Card.Link>
                        <Card.Link href="#" onClick={() => deleteProducts(product.id, index)}>Eliminar</Card.Link>
                      </Card.Body>
                    </Card>
                  </Col>
                )
              })
                : <h2>No hay productos</h2>
              }
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
const Dashboard = withRouter(Dash);
export default Dashboard