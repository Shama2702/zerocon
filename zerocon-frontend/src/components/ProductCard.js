import React from 'react';
import "./ProductCard.css";

import { Link } from 'react-router-dom';
import PropTypes from "prop-types";

import productDefaultImage from "./../assets/sunglasses/sunglass 01.png";
import {
    rootUrl
} from './../redux'
const ProductCard = ({ productId, productImage, productName, productCategory, productCurrentPrice, productPrevPrice, addProduct }) => {
    const addToCart = () => {
        const item = {
            id: productId,
            name: productName,
            image: productImage,
            price: productCurrentPrice,
            quantity: 1
        }
        addProduct(item);
    }

    return (
        <div className="productCard__card bg-white rounded my-2 p-2" data-aos="fade-up">
            <div className="border-bottom position-relative">
                <img className="w-100 py-4" src={productImage.length > 2 ? rootUrl+productImage : productDefaultImage} alt="Product" />

                <div className="productCard__actions bg-warning w-100 p-1 d-flex justify-content-around">
                    <Link to={`/shop/${productCategory}/${productId}`}><div className="productCard__action-icon cursor-pointer m-2 bg-light rounded-circle"><i className="fas fa-eye center-view"></i></div></Link>
                    <div className="productCard__action-icon cursor-pointer m-2 bg-light rounded-circle"><i className="far fa-heart center-view"></i></div>
                    <div className="productCard__action-icon cursor-pointer m-2 bg-light rounded-circle" onClick={addToCart}><i className="fas fa-shopping-cart center-view"></i></div>
                </div>
            </div>

            <div className="pt-1">
                <p className="text-uppercase text-muted font-weight-bold">{productName}</p>
                <div className="d-flex">
                    <h4>{`${productCurrentPrice} BDT`}</h4>
                    <p className="ml-3 mt-1 text-muted"><del>{`${productPrevPrice} BDT`}</del></p>
                </div>
            </div>
        </div>
    )
}

ProductCard.defaultProps = {
    productImage: "",
    productName: "Product Name",
    productCurrentPrice: 0,
    productPrevPrice: 0,
}
ProductCard.propTypes = {
    productId: PropTypes.number.isRequired,
    productImage: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    productCurrentPrice: PropTypes.number.isRequired,
    productPrevPrice: PropTypes.number.isRequired,
}

export default ProductCard
