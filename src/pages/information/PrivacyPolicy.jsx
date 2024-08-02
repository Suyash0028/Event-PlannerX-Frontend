import React from 'react';
import { Container } from 'react-bootstrap';
import './Information.css';

const PrivacyPolicy = () => {
    return (
        <Container className="py-4 custom-info">
            <h2>Privacy Policy</h2>
            <p>Your privacy is important to us. This privacy policy explains how we collect, use, and protect your information when you use our platform.</p>
            <h3>Information Collection</h3>
            <p>We collect information you provide directly to us, such as when you create an account, participate in an event, or contact us for support. This information may include your name, email address, and any other details you provide.</p>
            <h3>Information Use</h3>
            <p>We use the information we collect to operate, maintain, and improve our platform. This includes using your information to facilitate event management, communicate with you, and provide customer support.</p>
            <h3>Information Protection</h3>
            <p>We implement a variety of security measures to ensure the safety of your personal information. However, no method of transmission over the internet or electronic storage is 100% secure, so we cannot guarantee its absolute security.</p>
            <p>By using our platform, you agree to the collection and use of information in accordance with this privacy policy. We may update this policy from time to time, so please review it periodically.</p>
        </Container>
    );
};

export default PrivacyPolicy;
