import React, { useState, useEffect } from 'react'
import "./Cart.css"
import Checkout from './Checkout'
import { CloseButton } from './../../components/CloseButton'
import {
    Alert,
    Button,
    Card,
    Col,
    Container,
    Row
} from 'react-bootstrap'

import { connect } from 'react-redux'
import {
    removeProduct,
    increaseQuantity,
    decreaseQuantity,
    placeOrder
} from './../../redux'
const Cart = (props) => {
    const [totalCost, settotalCost] = useState(0);
    const [showCheckout, setshowCheckout] = useState(false);


    useEffect(() => {
        var cost = 0;
        props.cartItems && props.cartItems.forEach(product => {
            cost += product.price * product.quantity;
        });

        settotalCost(cost);
    }, [props.cartItems])

    const increaseQuantity = (id) => {
        // console.log(id);
        props.increaseQuantity(id)
    }
    const decreaseQuantity = (id) => {
        // console.log(id);
        props.decreaseQuantity(id)
    }
    const removeProduct = (id) => {
        props.removeProduct(id)
    }

    const checkOutOpen = () => {
        console.log(props.cartItems);
        setshowCheckout(true);
    }
    const checkOutClose = () => {
        setshowCheckout(false);
    }

    const placeOrder = (info) => {
        var data = {
            cart: props.cartItems,
            info: info
        }

        // console.log(data);
        props.placeOrder(data);

    }

    return (
        <>
        { showCheckout && <Checkout close={checkOutClose} placeOrder={placeOrder}/>}
            <div className="cart__root position-relative">
                {props.cartItems.length > 0 ?
                    <Container className="mt-5">
                        <Row>
                            <Col xs={12} lg={8}>
                                {props.cartItems.map((item, index) =>
                                    <Card className="mb-2" key={index}>
                                        <Card.Body className="d-flex">
                                            <div className="flex-grow-1 pr-3">
                                                <div className="row">
                                                    <div className="col-12 col-md-4">
                                                        <h4>{item.name}</h4>
                                                    </div>
                                                    <div className="col-12 col-md-8">
                                                        <div className="d-flex justify-content-between">
                                                            <div className="d-flex justify-content-between cart__quantityControler">
                                                                <button className="mx-1 btn btn-outline-secondary position-relative" onClick={() => decreaseQuantity(item.id)}><i className="center-view fas fa-minus"></i></button>
                                                                <input className="mx-1 text-center" type="text" name="quantity" value={item.quantity} disabled />
                                                                <button className="mx-1 btn btn-outline-secondary position-relative" onClick={() => increaseQuantity(item.id)}><i className="center-view fas fa-plus"></i></button>
                                                            </div>
                                                            <p>{`Total: ${item.price * item.quantity} BDT`}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <CloseButton action={() => removeProduct(item.id)} />
                                            </div>
                                        </Card.Body>
                                    </Card>
                                )}
                            </Col>

                            <Col xs={12} lg={4}>
                                <Card>
                                    <Card.Body>
                                        <Row>
                                            <Col xs={8}>
                                                <input type="text" className="w-100 form-control" name="coupon" placeholder="Do you have coupon?" />
                                            </Col>
                                            <Col xs={4}>
                                                <Button block variant="outline-warning">Apply</Button>
                                            </Col>
                                        </Row>
                                        <hr />
                                        <div>
                                            <div className="d-flex justify-content-between">
                                                <p>Cost:</p>
                                                <p>{totalCost + " BDT"}</p>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <p>Discount:</p>
                                                <p>0 BDT</p>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <p>Total Cost:</p>
                                                <p>{totalCost + " BDT"}</p>
                                            </div>

                                            <hr />

                                            <Button block variant="warning" onClick={checkOutOpen}>Checkout</Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                    :
                    <div className="cart__emptyCartMessage center-view text-center" >
                        <Alert variant="warning">Your cart is empty</Alert>
                    </div>}
            </div>
        </>
    )
}


const mapStateToProps = (state) => ({
    cartItems: state.cart.products
})

const mapDispatchToProps = dispatch => {
    return {
        removeProduct: (id) => dispatch(removeProduct(id)),
        increaseQuantity: (id) => dispatch(increaseQuantity(id)),
        decreaseQuantity: (id) => dispatch(decreaseQuantity(id)),
        placeOrder: (data) => dispatch(placeOrder(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);