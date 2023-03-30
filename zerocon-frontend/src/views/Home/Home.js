import React from 'react';
import "./Home.css";
import { useAlert } from 'react-alert'

import Header from './Header';
import Categories from './Categories';
import FeatureArea from './FeatureArea';
import FeaturedProducts from './FeaturedProducts';
import NewProducts from './NewProducts';
import LatestBlog from './LatestBlog';

import { Button } from 'react-bootstrap';
import banner1 from './../../assets/sunglass banner/sunglass banner 01.jpg';

import { connect } from 'react-redux';
import {
    addProduct
} from './../../redux'
const Home = (props) => {
    const alert = useAlert()
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
            <Header />
            <div className="mt-5"></div>
            <FeatureArea />
            <FeaturedProducts items={props.featuredItems} addProduct={addProductToCart} />

            <div className="container-fluid my-5 position-relative" data-aos="fade-up">
                <img className="w-100" src={banner1} alt="Banner" />
                <div className="home__banner-content w-fit-content center-view p-2 rounded text-white">
                    <p className="text-uppercase text-center mb-0"><small>all sunglass collection</small></p>
                    <h1 className="text-uppercase text-center">50 BDT off</h1>
                    <Button variant="success" className="float-center">Buy Now</Button>
                </div>
            </div>

            <NewProducts items={props.newItems} addProduct={addProductToCart} />

            <Categories />

            <LatestBlog />

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        newItems: state.product.newItems,
        featuredItems: state.product.featureItems,
        cart: state.cart.products
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addProduct: (product) => dispatch(addProduct(product))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)