import React from 'react';
import './BlogCard.css';
import blogImg from './../assets/blog-image.jpg';
import { Button, Card } from 'react-bootstrap';

function BlogCard() {
    return (
        <Card className="w-100 blogCard__card  my-2">
            <Card.Img variant="top" src={blogImg} />
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                </Card.Text>
                <Button variant="outline-secondary">Read more <i className="fas fa-chevron-left"></i></Button>
            </Card.Body>
        </Card>
    )
}

export default BlogCard
