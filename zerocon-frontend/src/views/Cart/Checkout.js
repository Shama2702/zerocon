import React, { useState, useEffect } from 'react'
import { Button, Col, Row } from 'react-bootstrap';

import { connect } from 'react-redux'
import {
    placeOrderReset
} from './../../redux'



const initInfo = {
    note: "",
    paymentMethod: "cash_on",
    transectionId: ""
}

const paymentMethods = [
    {
        title: "Cash On",
        value: "cash_on"
    },
    {
        title: "Bkash",
        value: "bkash"
    },
    {
        title: "Rocket",
        value: "rocket"
    },
    {
        title: "Nagad",
        value: "nagad"
    }
]
const Checkout = (props) => {
    const [info, setinfo] = useState(initInfo);

    useEffect(() => {
        return () => {
            props.placeOrderReset();
        }// eslint-disable-next-line
    }, [])

    const inputHandler = (e) => {
        setinfo({
            ...info,
            [e.target.name]: e.target.value
        })
    }

    const next = () => {
        props.placeOrder(info);
    }
    return (
        <div className="bg-ovarlay">
            <div className="checkout__container p-2 bg-white rounded center-view">
                {props.placeorder.loading ?

                    <div>Loading...</div>
                    : props.placeorder.error ?
                        <div>Fail to place order</div>
                        : props.placeorder.data ?
                            <div>
                                <p className="text-center text-success">Order placed!!!</p>
                                <Button variant="outline-success" className="mt-2 float-right" onClick={props.close}>Close</Button>
                            </div>
                            :
                            <>
                                <textarea name="note" className="w-100 form-control" rows="5" placeholder="Note (optional)" value={info.note} onChange={inputHandler}></textarea>
                                <select name="paymentMethod" className="mt-2 form-control" value={info.paymentMethod} onChange={inputHandler}>
                                    {paymentMethods.map((method, index) =>
                                        <option value={method.value} key={index}>{method.title}</option>
                                    )}
                                </select>

                                {info.paymentMethod !== 'cash_on' &&
                                    <input type="text" name="transectionId" className="mt-2 form-control" value={info.transectionId} placeholder="Transection id" onChange={inputHandler} />
                                }
                                <Row className="mt-3" >
                                    <Col xs={6}>
                                        <Button block variant="danger" onClick={props.close}>Close</Button>
                                    </Col>
                                    <Col xs={6}>
                                        <Button block variant="warning" onClick={next}>Confirm Order</Button>
                                    </Col>
                                </Row>
                            </>}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    placeorder: state.order.placeOrder
})

const mapDispatchToProps = dispatch => {
    return {
        placeOrderReset: () => dispatch(placeOrderReset())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);