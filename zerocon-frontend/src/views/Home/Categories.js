import React from 'react'
import { Link } from 'react-router-dom'

import { Container, Card, Row, Col } from 'react-bootstrap'
import sunglass_icon from './../../assets/icons/sunglass icon.png'
import watch_icon from './../../assets/icons/hand watch icon.png'
import tshirt_icon from './../../assets/icons/tshirt icon.png'
import shoe_icon from './../../assets/icons/shoe icon.png'
import beauty_icon from './../../assets/icons/health and beauty icon.png'


const Categories = () =>
    <div className="my-5 bg-secondary py-5">
        <Container data-aos="fade-up">
            <div data-aos="fade-up">
                <h3 className="w-fit-content mx-auto text-uppercase border-bottom ff-russo-one"><span className="text-warning">Popular</span> Categories</h3>
                <p className="text-center text-white">Lorem ipsum dolor sit amet consectetur, adipisicing elit. In, iste.</p>
            </div>

            <Row className="justify-content-center">
                <Col xs={4} sm={4} md={3} lg={2} >
                    <Card className="w-100 shadow my-1 category-card" as={Link} to='/sunglass'>
                        <Card.Img variant="top" className="p-1" src={sunglass_icon} />
                        <Card.Footer>
                            <Card.Title className="text-center text-dark"><p>Sunglass</p></Card.Title>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col xs={4} sm={4} md={3} lg={2} >
                    <Card className="w-100 shadow my-1 category-card" as={Link} to='/watch'>
                        <Card.Img variant="top" className="p-1" src={watch_icon} />
                        <Card.Footer>
                            <Card.Title className="text-center text-dark"><p>Watch</p></Card.Title>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col xs={4} sm={4} md={3} lg={2} >
                    <Card className="w-100 shadow my-1 category-card" as={Link} to='/t-shirt'>
                        <Card.Img variant="top" className="p-1" src={tshirt_icon} />
                        <Card.Footer>
                            <Card.Title className="text-center text-dark"><p>T-Shirt</p></Card.Title>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col xs={4} sm={4} md={3} lg={2} >
                    <Card className="w-100 shadow my-1 category-card" as={Link} to='/shoe'>
                        <Card.Img variant="top" className="p-1" src={shoe_icon} />
                        <Card.Footer>
                            <Card.Title className="text-center text-dark"><p>Shoe</p></Card.Title>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col xs={4} sm={4} md={3} lg={2} >
                    <Card className="w-100 shadow my-1 category-card" as={Link} to='/beauty'>
                        <Card.Img variant="top" className="p-1" src={beauty_icon} />
                        <Card.Footer>
                            <Card.Title className="text-center text-dark"><p>Beauty</p></Card.Title>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    </div>

export default Categories
