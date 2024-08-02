import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import './Information.css';

const Contact = () => {
    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
    
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });
    
        const data = await response.json();
    
        if (data.success) {
          toast.success("Contact form submitted.");
          event.target.reset();
        } else {
          console.log("Error", data);
          toast.error(data.message);
        }
      };
    return (
        <Container className="py-4 custom-info">
            <h2>Contact Us</h2>
            <p>If you have any questions or need assistance, please feel free to contact us using the form below. We are here to help you!</p>
            <Form onSubmit={onSubmit}>
                <input type="hidden" name="access_key" value="40a26cc4-87a3-4645-b54f-ede78f98d067" />
                <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="name" type="text" placeholder="Enter your name" />
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" type="email" placeholder="Enter your email" />
                </Form.Group>
                <Form.Group controlId="formMessage">
                    <Form.Label>Message</Form.Label>
                    <Form.Control name="message" as="textarea" rows={3} placeholder="Enter your message" />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                    Submit
                </Button>
            </Form>
        </Container>
    );
};

export default Contact;
