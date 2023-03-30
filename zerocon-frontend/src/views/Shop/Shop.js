import React from 'react';
import { useAlert } from 'react-alert'
import ProductCard from './../../components/ProductCard';
import {
    Alert,
    Button,
    Col,
    Container,
    Row
} from 'react-bootstrap';
import { connect } from 'react-redux';
import {
    addProduct
} from './../../redux'
export const Shop = (props) => {
    const alert = useAlert()

    // console.log(props.category);

    var products = props.productList.data;
    if (props.category === "cap") {
        products = products.filter(p => p.category === 'cap');
    }
    else if (props.category === "sunglass") {
        products = products.filter(p => p.category === 'sunglass');
    }



    const addProductToCart = (product) => {
        const checkCart = props.cart.filter(item => item.id === product.id);
        // console.log(checkCart.length);
        if (checkCart.length > 0) {
            alert.show('Already added');
            return;
        }
        props.addProduct(product);

    }
    return (
        <div>
            <Alert variant="secondary">
                <div className="container-xl">
                    <h1 className="ff-russo-one">{`Shop ${props.category ? `/ ${props.category}`:''}`}</h1>
                    <p className="text-muted">Very us move be blessed multiply night</p>
                </div>
            </Alert>

            <Container>
                <Row>
                    <Col className="d-none d-lg-block" xs={0} lg={3}>
                        <Alert variant="secondary">
                            <div>
                                <label>Price range</label>
                                <input className="w-100" type="range" step="100" min="100" max="2000" />
                            </div>
                            <hr />
                            <div>
                                <label>Color</label><br />
                                <input type="radio" id="white" name="color" value="white" />
                                <label className="ml-3" htmlFor="white">White</label><br />
                                <input type="radio" id="black" name="color" value="black" />
                                <label className="ml-3" htmlFor="black">Black</label><br />
                                <input type="radio" id="red" name="color" value="red" />
                                <label className="ml-3" htmlFor="red">Red</label>
                            </div>
                        </Alert>
                        <Alert variant="secondary">
                            <div>
                                <label>Other Category</label><br />
                                <input type="radio" id="white" name="color" value="white" />
                                <label className="ml-3" htmlFor="white">Category One</label><br />
                                <input type="radio" id="black" name="color" value="black" />
                                <label className="ml-3" htmlFor="black">Category Two</label><br />
                                <input type="radio" id="red" name="color" value="red" />
                                <label className="ml-3" htmlFor="red">Category Three</label>
                            </div>
                        </Alert>
                    </Col>
                    <Col xs={12} lg={9}>
                        <Alert variant="secondary">
                            <div>
                                {`Choose your favorite ${props.category? props.category: 'products'} from here!!!`}
                            </div>
                        </Alert>

                        <Row>
                            {products.map((product, index) =>
                                <Col key={index} xs={6} lg={4} >
                                    <ProductCard
                                        productId={product.id}
                                        productImage={product.image_url.length > 0? product.image_url[0] : ""}
                                        productName={product.name}
                                        productCategory = {product.category}
                                        productCurrentPrice={product.price}
                                        productPrevPrice={product.price + 50}
                                        addProduct={addProductToCart} />
                                </Col>
                            )}
                        </Row>
                        <Button variant="outline-success">Load more <i className="fas fa-angle-double-down ml-2"></i></Button>
                    </Col>
                </Row>
            </Container>


        </div>
    )
}

const mapStateToProps = (state) => ({
    productList: state.product.items,
    cart: state.cart.products
})

const mapDispatchToProps = dispatch => {
    return {
        addProduct: (product) => dispatch(addProduct(product))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
