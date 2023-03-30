import React from 'react'
import { Button } from 'react-bootstrap'
function Header() {
    return (
        <div className="header">
            <div className="header-content text-dark">
                <h4 className="text-warning">Stay Home, Shop Online.</h4>
                <h1 className="ff-russo-one">Buy product with 0% <span className="text-warning">confusion!!!</span></h1>
                <Button variant="outline-secondary">Buy Now <i className="fas fa-shopping-cart ml-2"></i></Button>
            </div>
        </div>
    )
}

export default Header
