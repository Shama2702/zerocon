import React from 'react'
import {
    Row,
    Col
} from 'react-bootstrap'

const FeatureArea = () =>
    <div className="container-fluid">
        <Row>
            <Col xs={6} lg={3} className="mb-3">
                <div className="text-center p-3 fearureArea__item" data-aos="fade-right">
                    <div className="text-warning my-3 fearureArea__icon">
                        <i className="fas fa-dollar-sign"></i>
                    </div>

                    <div className="mb-3">
                        <p className="mb-0">MONEY BACK GURANTEE</p>
                        <small className="text-muted">Lorem ipsum dolor sit amet.</small>
                    </div>
                </div>
            </Col>
            <Col xs={6} lg={3} className="mb-3">
                <div className="text-center p-3 fearureArea__item" data-aos="fade-right">
                    <div className="text-warning my-3 fearureArea__icon">
                        <i className="fas fa-truck"></i>
                    </div>

                    <div className="mb-3">
                        <p className="mb-0">FREE DELIVERY</p>
                        <small className="text-muted">Lorem ipsum dolor sit amet.</small>
                    </div>
                </div>
            </Col>
            <Col xs={6} lg={3} className="mb-3">
                <div className="text-center p-3 fearureArea__item" data-aos="fade-left">
                    <div className="text-warning my-3 fearureArea__icon">
                        <i className="fas fa-headset"></i>
                    </div>

                    <div className="mb-3">
                        <p className="mb-0">ALWAYS SUPPORT</p>
                        <small className="text-muted">Lorem ipsum dolor sit amet.</small>
                    </div>
                </div>
            </Col>
            <Col xs={6} lg={3} className="mb-3">
                <div className="text-center p-3 fearureArea__item" data-aos="fade-left">
                    <div className="text-warning my-3 fearureArea__icon">
                        <i className="fas fa-shield-alt"></i>
                    </div>

                    <div className="mb-3">
                        <p className="mb-0">SECURE PAYMENT</p>
                        <small className="text-muted">Lorem ipsum dolor sit amet.</small>
                    </div>
                </div>
            </Col>
        </Row>
    </div>

export default FeatureArea
