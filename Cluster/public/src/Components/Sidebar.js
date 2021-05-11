import React from "react";
import { Nav } from "react-bootstrap";
import { withRouter } from "react-router";
import './Sidebar.css'

const Side = () => {

  return (
    <>

      <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
        activeKey="/"
      >
        <div className="sidebar-sticky"></div>
        <Nav.Item>
          <Nav.Link href="/">Insertar producto</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/list">Listar productos</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/cart">Carrito</Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
};
const Sidebar = withRouter(Side);
export default Sidebar