import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import API from "../api/axios";

function EditProduct({
    show,
    handleClose,
    refreshProducts,
    product
}) {

    const [formData, setFormData] = useState({
        product_name: "",
        sku: "",
        available_quantity: "",
        low_stock_threshold: "",
        cost_price: ""
    });

    useEffect(() => {

        if(product){

            setFormData(product);

        }

    }, [product]);

    const handleChange = (e)=>{

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async(e)=>{

        e.preventDefault();

        try{

            await API.put(
                `/products/${product.id}`,
                formData
            );

            refreshProducts();

            handleClose();

            alert("Product Updated");

        }

        catch(error){

            console.log(error);

        }

    };

    return(

        <Modal
            show={show}
            onHide={handleClose}
        >

            <Modal.Header closeButton>

                <Modal.Title>
                    Edit Product
                </Modal.Title>

            </Modal.Header>

            <Form onSubmit={handleSubmit}>

                <Modal.Body>

                    <Form.Group className="mb-3">

                        <Form.Label>
                            Product Name
                        </Form.Label>

                        <Form.Control
                            name="product_name"
                            value={formData.product_name}
                            onChange={handleChange}
                        />

                    </Form.Group>

                    <Form.Group className="mb-3">

                        <Form.Label>
                            SKU
                        </Form.Label>

                        <Form.Control
                            name="sku"
                            value={formData.sku}
                            onChange={handleChange}
                        />

                    </Form.Group>

                    <Form.Group className="mb-3">

                        <Form.Label>
                            Quantity
                        </Form.Label>

                        <Form.Control
                            type="number"
                            name="available_quantity"
                            value={formData.available_quantity}
                            onChange={handleChange}
                        />

                    </Form.Group>

                    <Form.Group className="mb-3">

                        <Form.Label>
                            Threshold
                        </Form.Label>

                        <Form.Control
                            type="number"
                            name="low_stock_threshold"
                            value={formData.low_stock_threshold}
                            onChange={handleChange}
                        />

                    </Form.Group>

                    <Form.Group>

                        <Form.Label>
                            Cost Price
                        </Form.Label>

                        <Form.Control
                            type="number"
                            name="cost_price"
                            value={formData.cost_price}
                            onChange={handleChange}
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
                        variant="warning"
                    >
                        Update Product
                    </Button>

                </Modal.Footer>

            </Form>

        </Modal>

    );

}

export default EditProduct;