import React from 'react';
import './Footer.css';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer className="mt-5 bg-secondary">
            <div className="container-lg">
                <div className="py-5 text-light" data-aos="fade-left" data-aos-offset="100">
                    <Row>
                        <Col xs={12} md={3}>
                            <h1><span className="text-warning">Zero</span>Con</h1>

                            <div className="footer__social d-flex mb-3">
                                <Link to="https://www.facebook.com"><div><i className="fab fa-facebook-f center-view"></i></div></Link>
                                <Link to="https://www.twitter.com"><div><i className="fab fa-twitter center-view"></i></div></Link>
                                <Link to="https://www.linkedin.com"><div><i className="fab fa-linkedin-in center-view"></i></div></Link>
                            </div>
                        </Col>
                        <Col xs={12} md={3}>
                            <h3><span className="text-warning">Top</span> Products</h3>
                            <ul className="nav__itemContainer">
                                <li><Link to="/">Managed Website</Link></li>
                                <li><Link to="/">Managed Reputation</Link></li>
                                <li><Link to="/">Power Tools</Link></li>
                                <li><Link to="/">Marketing Service</Link></li>
                            </ul>
                        </Col>
                        <Col xs={12} md={3}>
                            <h3><span className="text-warning">Quick</span> Links</h3>
                            <ul className="nav__itemContainer">
                                <li><Link to="/">Jobs</Link></li>
                                <li><Link to="/">Brand Assets</Link></li>
                                <li><Link to="/">Investor Relations</Link></li>
                                <li><Link to="/">Terms of Service</Link></li>
                            </ul>
                        </Col>
                        <Col xs={12} md={3}>
                            <h3><span className="text-warning">Our</span> Resources</h3>
                            <ul className="nav__itemContainer">
                                <li><Link to="/">Guides</Link></li>
                                <li><Link to="/">Research</Link></li>
                                <li><Link to="/">Experts</Link></li>
                                <li><Link to="/">Agencies</Link></li>
                            </ul>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className="bg-dark border-top border-light text-light py-2">
                <div className="container-lg">
                    <span>{"Copyright@"+year}</span>
                </div>

            </div>
        </footer>
    )
}

export default Footer
