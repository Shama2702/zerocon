import React from 'react';
import ProductCard from "./../../components/ProductCard";
import {
    Container,
    Spinner,
    Alert,
    Row,
    Col
} from 'react-bootstrap';

const FeaturedProducts = ({ items, addProduct }) => {
    // console.log(items);
    return (
        <React.Fragment>
            <Container className="mt-5">
                <div data-aos="fade-up">
                    <h3 className="w-fit-content mx-auto text-uppercase border-bottom ff-russo-one"><span className="text-warning">Featured</span> products</h3>
                    <p className="text-center">Lorem ipsum dolor sit amet consectetur, adipisicing elit. In, iste.</p>
                </div>
            </Container>

            <Container>
                {items.loading && <div className="mx-auto my-3 w-fit-content">
                    <Spinner animation="border" />
                </div>}

                {items.error && <Alert variant="warning">
                    Items Loading fail.
            </Alert>}
            </Container>
            {items.data.length < 1 ? <Container><Alert variant="warning">
                0 items found.
            </Alert></Container>
                :
                <div className="container-xl">
                    <Row className="justify-content-around">
                        {items.data.map((item, index) =>
                            <Col key={index} xs={6} lg={3}>
                                <ProductCard
                                    productId = {item.id}
                                    productImage={item.image_url.length > 0? item.image_url[0] : ""}
                                    productName={item.name}
                                    productCategory = {item.category}
                                    productCurrentPrice={item.price}
                                    productPrevPrice={item.price + 50} 
                                    addProduct = {addProduct}/>
                            </Col>)}
                    </Row>
                </div>
            }


        </React.Fragment>
    )
}

export default FeaturedProducts

