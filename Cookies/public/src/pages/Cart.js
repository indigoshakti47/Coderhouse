import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { withRouter } from "react-router";
import Sidebar from "../Components/Sidebar";
import { getCartApi, deleteCartProductApi, addCartProductApi } from "../api/cart";

const Dash = () => {

  const [cartData, setCartData] = useState(null)
  const [productInsert, setProductInsert] = useState(null)

  useEffect(() => {
    getProcucts()
  }, [])

  const getProcucts = async () => {
    const response = await getCartApi();
    setCartData(response)
  }

  const deleteProducts = async (id) => {
    const response = await deleteCartProductApi(id);
    console.log(response)
    const newCar = await getCartApi();
    setCartData(newCar)
  }

  const submitForm = async() => {
    await addCartProductApi(productInsert)
    const newCar = await getCartApi();
    setCartData(newCar)
  }

  console.log(cartData)
  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={2} id="sidebar-wrapper">
            <Sidebar />
          </Col>

          <Col xs={10}>
            <Row style={{marginBottom: "30px", marginTop: "20px"}}>
              <Col xs={2}>
                <h4>Ingresar producto</h4>
              </Col> 
              <Col xs={8}>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Ingresa producto"
                name="title"
                value={productInsert}
                onChange={(e) => setProductInsert(e.target.value)}
              />
              </Col>
              <Col xs={2}>
                <Button
                  type="submit"
                  className="btn btn-primary"
                  href="#p"
                  onClick={() => submitForm()}
                >
                  Ingresar producto
                </Button>
              </Col>
            </Row>
            <Row>
              {cartData ? cartData.products.map((product, index) => {
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
                        <Card.Link href="#" onClick={() => deleteProducts(product.id)}>Eliminar</Card.Link>
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