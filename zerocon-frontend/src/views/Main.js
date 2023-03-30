import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom";
import cookie from 'react-cookies';
import "./Main.css";

import Navbar from './../components/Navbar'
import Home from './Home/Home'
import About from './About'
import NotFound from './NotFound'
import Footer from './../components/Footer'
import Shop from './Shop/ShopControl'
import Cart from './Cart/Cart'
import Profile from './Profile/Profile'
import SunglassDetails from './Shop/Sunglass/SunglassDetails'
import CapDetails from './Shop/Cap/CapDetails'

import { connect } from 'react-redux'
import {
    fetchItem,
    fetchFeaturedItem,
    fetchNewItem,
    setPrevCart,
    auth
} from './../redux';
export class Main extends Component {
    componentDidMount() {
        this.props.fetchItem();
        this.props.fetchFeaturedItem();
        this.props.fetchNewItem();

        const cart = cookie.load('cart');
        cart && this.props.setPrevCart(cart);

        const token = cookie.load('token');
        token && this.props.auth(token);

    }

    render() {
        return (
            <React.Fragment>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/shop/sunglass/:id" component={SunglassDetails} />
                    <Route exact path="/shop/cap/:id" component={CapDetails} />
                    <Route path="/shop" component={Shop} />
                    <Route path="/cart" component={Cart} />
                    <Route path="/profile" component={Profile} />
                    <Route exact path="/about">
                        <About />
                    </Route>
                    <Route>
                        <NotFound />
                    </Route>
                </Switch>
                <Footer />
            </React.Fragment>
        )
    }
}


const mapStateToProps = state => {
    return {
        cart: state.cart.products
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchItem: () => dispatch(fetchItem()),
        fetchFeaturedItem: () => dispatch(fetchFeaturedItem()),
        fetchNewItem: () => dispatch(fetchNewItem()),
        setPrevCart: (cart) => dispatch(setPrevCart(cart)),
        auth: (token) => dispatch(auth(token)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main)