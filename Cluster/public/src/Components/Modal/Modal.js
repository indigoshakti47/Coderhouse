import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { updateProductApi, getProductsApi } from "../../api/product";

function ModalComponent({ show, setShow, product, setProducts }) {


  const [productData, setProductData] = useState({
    nombre: null,
    descripcion: null,
    codigo: null,
    foto: null,
    precio: null,
    stock: null
  })

  useEffect(() => {
    setProductData({
      nombre: product && product.nombre,
      descripcion: product && product.descripcion,
      codigo: product && product.codigo,
      foto: product && product.foto,
      precio: product && product.precio,
      stock: product && product.stock
    })
  }, [product])

  const handleClose = () => setShow(false);

  const submitForm = async () => {
    await updateProductApi(product.id, productData)
    const response = await getProductsApi()
    setProducts(response)
    setShow(false)
  }

  return product ? (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modificar producto {productData.nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => submitForm()}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  ) : null;
}

export default ModalComponent;