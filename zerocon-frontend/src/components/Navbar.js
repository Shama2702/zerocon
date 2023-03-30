import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from './Auth/Auth';
import "./Navbar.css";
import {
    Col,
    Navbar,
    Row
} from 'react-bootstrap';

import { connect } from 'react-redux';

const Navigationbar = (props) => {
    const [ShowAuth, setShowAuth] = useState(false);

    const closeAuth = () => {
        setShowAuth(false);
    }
    // console.log(props.me);
    return (<>
        {ShowAuth && <Auth close={closeAuth} />}
        <Navbar className="sticky-top" bg="dark" color="white">
            <div className="container-xl">
                <Navbar.Brand as={Link} to="/" className="text-white">ZeroCon</Navbar.Brand>
                <div className="mr-auto ml-5 position-relative">
                    <Link className="text-decoration-none text-white" id="nav__navItemShop" to="/shop">Shop</Link>

                    <div className="bg-white p-3 shadow rounded nav__subMenu">
                        <Row>
                            <Col xs={6}>
                                <h5><span className="text-warning">For </span>Mens</h5>
                                <hr />
                                <ul>
                                    <li><Link to="/shop/sunglass">Sunglass</Link></li>
                                    <li><Link to="/shop/cap">Cap</Link></li>
                                </ul>
                            </Col>
                            <Col xs={6}>
                                <h5><span className="text-warning">For </span>Womens</h5>
                                <hr />
                                <ul>
                                    <li><Link to="/shop/sunglass">Sunglass</Link></li>
                                    <li><Link to="/shop/cap">Cap</Link></li>
                                </ul>
                            </Col>
                        </Row>
                    </div>
                </div>


                <div className="mr-3 d-flex justify-content-between nav__rightMenu">
                    {props.me.data ?
                        <Link to="/profile">
                            <div className="text-white position-relative">
                                <i className="fas fa-user"></i>
                            </div>
                        </Link>
                        :
                        <div className="text-white position-relative" onClick={() => setShowAuth(true)}>
                            <i className="fas fa-sign-in-alt cursor-pointer"></i>
                        </div>
                    }
                    <div className="border-right"></div>
                    <Link to="/cart">
                        <div className="text-white position-relative">
                            <i className="fas fa-shopping-cart"></i>
                            <span className="ml-1 badge badge-light position-absolute" style={{ top: "-10px" }}>{props.cartItems.length}</span>
                        </div>
                    </Link>
                </div>
            </div>
        </Navbar>
    </>
    )
}


const mapStateToProps = (state) => ({
    cartItems: state.cart.products,
    me: state.user.me
})
export default connect(mapStateToProps)(Navigationbar);