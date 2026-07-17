import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import API from "../api/axios";

function UpdateStock({
  show,
  handleClose,
  product,
  refreshProducts,
}) {

  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    if (product) {
      setQuantity(product.available_quantity);
    }
  }, [product]);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.patch(`/products/${product.id}/stock`, {
        available_quantity: Number(quantity),
      });

      alert("Stock Updated Successfully");

      refreshProducts();

      handleClose();

    } catch (error) {

      console.log(error);

      alert("Failed to update stock");

    }

  };

  return (
    <Modal show={show} onHide={handleClose}>

      <Modal.Header closeButton>

        <Modal.Title>
          Update Stock
        </Modal.Title>

      </Modal.Header>

      <Form onSubmit={handleSubmit}>

        <Modal.Body>

          <p>
            <strong>Product:</strong> {product?.product_name}
          </p>

          <Form.Group>

            <Form.Label>
              Available Quantity
            </Form.Label>

            <Form.Control
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />

          </Form.Group>

        </Modal.Body>

        <Modal.Footer>

          <Button
            variant="secondary"
            onClick={handleClose}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="primary"
          >
            Update Stock
          </Button>

        </Modal.Footer>

      </Form>

    </Modal>
  );
}

export default UpdateStock;