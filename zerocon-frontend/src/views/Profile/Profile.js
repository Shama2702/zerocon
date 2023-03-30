import React from 'react'
import './Profile.css'
import cookie from 'react-cookies'
import {
    Alert,
    Button,
    Card,
    Col,
    Row,
    Spinner
} from 'react-bootstrap'

import defaultUser from './../../assets/default user.png'
import { connect } from 'react-redux'
import {
    rootUrl
} from './../../redux'
const Profile = (props) => {
    const orders = props.orders;
    const activeOrders = orders.data.filter(o => o.status !== 'complete');
    const completeOrders = orders.data.filter(o => o.status === 'complete');

    const logout = () => {
        cookie.remove("token");
        window.location.reload();
    }

    return (
        <div className="mt-5 container-xl position-relative profile__root">
            {props.me.data ?
                <>
                    <Row>
                        <Col xs={12} md={5} className="mb-2">
                            <Card className="text-center">
                                <Card.Body>
                                    <img className="profile__userImage" src={props.me.data.profile_pic_url ? rootUrl + props.me.data.profile_pic_url : defaultUser} alt="User" />
                                    <div className="mt-3">
                                        <h3>{props.me.data.first_name + " " + props.me.data.last_name}</h3>
                                        <hr />
                                        <div className="text-left">
                                            <div>
                                                <h6>Address:</h6>
                                                <p>{props.me.data.address}</p>
                                            </div>
                                            <hr />
                                            <div>
                                                <h6>Contact:</h6>
                                                <p>{props.me.data.contact_number}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>

                                <Card.Footer>
                                    <Button variant="outline-danger" block onClick={logout}>Logout</Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                        <Col xs={12} md={7} className="mb-2">
                            <Card>
                                <Card.Body>
                                    <p className="font-weight-bold text-left">Active Order</p>
                                    <hr />

                                    {orders.loading &&
                                        <div>
                                            <Spinner animation="grow" />
                                            Loading...
                                        </div>
                                    }

                                    {orders.error &&
                                        <Alert variant="danger">
                                            Fail to load orders
                                        </Alert>
                                    }

                                    {activeOrders.length > 0 ?
                                        activeOrders.map((order, index) =>
                                            <Alert variant="secondary" key={index}>
                                                <div className="d-flex justify-content-between">
                                                    <div>
                                                        <h3>{`Order Id: ${order.order_id}`}</h3>
                                                        <small className="text-success">{order.status}</small>
                                                    </div>
                                                    <div>
                                                        <p>{order.order_date.toString().slice(0, 10)}</p>
                                                    </div>
                                                </div>
                                            </Alert>
                                        )
                                        :
                                        <Alert variant="secondary">
                                            You have no active orders
                                        </Alert>
                                    }

                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>


                    <Row>
                        <Col xs={12} md={5} className="mb-2">
                            <Card className="text-center">
                                <Card.Body>
                                    <p className="font-weight-bold text-left">Completed Orders</p>
                                    <hr />

                                    {orders.loading &&
                                        <div>
                                            <Spinner animation="grow" />
                                            Loading...
                                        </div>
                                    }

                                    {orders.error &&
                                        <Alert variant="danger">
                                            Fail to load orders
                                        </Alert>
                                    }

                                    {completeOrders.length > 0 ?
                                        completeOrders.map((order, index) =>
                                            <Alert variant="secondary" key={index}>
                                                <div className="d-flex justify-content-between">
                                                    <div>
                                                        <h3>{`Order Id: ${order.order_id}`}</h3>
                                                    </div>
                                                    <div>
                                                        <p>{order.order_date.toString().slice(0, 10)}</p>
                                                    </div>
                                                </div>
                                            </Alert>
                                        )
                                        :
                                        <Alert variant="secondary">
                                            You have no completed orders
                                        </Alert>
                                    }

                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </>


                :
                <div className="profile__notLoginMessage text-center p-3 rounded center-view">
                    <i className="fas fa-user-slash mb-3"></i>
                    <div>
                        <h3>You are not login.</h3>
                        <p>Please login or create a new account.</p>
                    </div>
                </div>
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        me: state.user.me,
        orders: state.order.orders
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // fetchItem: () => dispatch(fetchItem()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile)