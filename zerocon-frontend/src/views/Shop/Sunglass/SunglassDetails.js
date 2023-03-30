import React, { useState, useEffect } from 'react';
import SunglassTrial from './SunglassTrial';

import { useAlert } from "react-alert";

import {
    Container,
    Row,
    Col,
    Card,
    Button
} from 'react-bootstrap';

import sunglass_img from './../../../assets/sunglasses/sunglass 01.png';
import { connect } from 'react-redux';
import {
    rootUrl,
    addProduct
} from './../../../redux'

export const SunglassDetails = (props) => {
    const alert = useAlert();

    const [showTrial, setshowTrial] = useState(false);
    const [quantity, setquantity] = useState(1);
    const [itemDetails, setitemDetails] = useState(null);
    const [itemImage, setitemImage] = useState(null);

    // console.log(itemDetails);
    const toggleTrial = () => {
        setshowTrial(!showTrial)
    }

    const increaseQuantity = () => {
        if (quantity >= 10) {
            alert.error("You can not select up to 10 items");
            return;
        }
        setquantity(quantity + 1);
    }
    const decreaseQuantity = () => {
        if (quantity <= 1) {
            alert.error("You have to select minimun 1 item");
            return;
        }
        setquantity(quantity - 1);
    }

    const quantityHandler = (e) => {
        setquantity(e.target.value);
    }
    const addProductToCart = () => {
        const checkCart = props.cart.filter(item => item.id === itemDetails.id);
        if (checkCart.length > 0) {
            alert.show('Already added');
            return;
        }

        const item = {
            id: itemDetails.id,
            name: itemDetails.name,
            image: itemDetails.thumbnail,
            price: itemDetails.price,
            quantity: quantity
        }

        props.addProduct(item)

        // console.log(item);
    }
    useEffect(() => {
        if (props.itemList.data.length) {
            // console.log(props.match.params.id);
            // console.log(props.itemList);
            const details = props.itemList.data.filter(i => parseInt(i.id) === parseInt(props.match.params.id));
            setitemDetails(details[0])
            try {
                if (details[0].image_url.length > 0) {
                    setitemImage(details[0].image_url[0])
                }
            } catch (error) {

            }

        }
    }, [props.itemList, props.match.params.id])
    // console.log(itemImage);
    return (
        <div className="position-relative" style={{minHeight:'50vh'}}>
            {itemDetails ? <>
                {showTrial && <SunglassTrial toggleTrial={toggleTrial} id={itemDetails.id} />}
                <Container>
                    <Row className="my-5">
                        <Col sm={12} md={5}>
                            <Card>
                                <Card.Body>
                                    <img className="w-100" src={itemImage ? rootUrl + itemImage : sunglass_img} alt="Sunglass" />
                                </Card.Body>
                                <Card.Footer>
                                    <Button block className="mt-3" variant="outline-secondary" onClick={toggleTrial}>Trial this</Button>
                                </Card.Footer>
                            </Card>

                        </Col>
                        <Col sm={12} md={7}>
                            <h1>{itemDetails.name}</h1>
                            <p className="mb-1"><span className="font-weight-bold">Price:</span>  {`${itemDetails.price} BDT`}</p>
                            <p className="text-muted"><span className="font-weight-bold">Previous Price:</span>  <del>{`${itemDetails.price + 50} BDT`}</del></p>

                            <div className="pt-5">
                                <div className="d-flex">
                                    <Button variant="warning" onClick={decreaseQuantity}><i className="fa fa-minus"></i></Button>
                                    <input className="form-control mx-2 border-warning" type="number" name="quantity" id="productDetails__quantity" style={{ maxWidth: "100px" }} value={quantity} onChange={quantityHandler} />
                                    <Button variant="warning" onClick={increaseQuantity}><i className="fa fa-plus"></i></Button>
                                </div>
                                <Button variant="outline-secondary" className="mt-3" block onClick={addProductToCart}>Add to cart <i className="fas fa-cart-plus ml-2"></i></Button>
                            </div>
                        </Col>
                    </Row>

                    <Card>
                        <Card.Header as="h5">Related Products</Card.Header>
                        <Card.Body>
                            Here will appeare some of related products
                    </Card.Body>
                    </Card>
                </Container>
            </>
                :
                <p>Loading...</p>
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    itemList: state.product.items,
    cart: state.cart.products
})

const mapDispatchToProps = dispatch => {
    return {
        addProduct: (product) => dispatch(addProduct(product))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SunglassDetails)