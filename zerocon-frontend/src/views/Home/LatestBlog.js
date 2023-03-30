import React from 'react';
import BlogCard from './../../components/BlogCard';
import {
    Col,
    Row
} from 'react-bootstrap';

const LatestBlog = () => {
    return (
        <div className="container-xl" data-aos="fade-up">

            <div data-aos="fade-up">
                <h3 className="w-fit-content mx-auto text-uppercase border-bottom ff-russo-one"><span className="text-warning">Latest</span> blog</h3>
                <p className="text-center">Lorem ipsum dolor sit amet consectetur, adipisicing elit. In, iste.</p>
            </div>


            <Row>
                <Col xs={6} lg={4}>
                    <BlogCard />
                </Col>
                <Col xs={6} lg={4}>
                    <BlogCard />
                </Col>
                <Col xs={6} lg={4}>
                    <BlogCard />
                </Col>
            </Row>
        </div>
    )
}

export default LatestBlog
