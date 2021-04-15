import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { withRouter } from "react-router";
import Sidebar from "../Components/Sidebar";
import Modal from "../Components/Modal/Modal";
import { getProductsApi, deleteProductApi } from "../api/product";

const Dash = () => {

  const [productData, setProductData] = useState([])
  const [show, setShow] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

  useEffect(() => {
    getProcucts()
  }, [])

  const handleShow = (index) => {
    console.log(index)
    setShow(true);
    setEditProductId(index)
  }

  const getProcucts = async () => {
    const response = await getProductsApi(productData);
    setProductData(response)
  }

  const deleteProducts = async (id, index) => {
    const response = await deleteProductApi(id);
    console.log(response)
    setProductData(productData.filter(function (product) { return product.id !== id; }))
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