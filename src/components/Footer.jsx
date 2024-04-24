import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="py-5">
      <Container>
        <Row className="gap-4">
          <Col>
            <Link to="https://github.com/Bahriddin0707/">
              GitHub: Bahriddin0707
            </Link>
          </Col>
          <Col>
            <Link to="https://t.me/bahriddin_0707">
              Telegram: Bahriddin0707
            </Link>
          </Col>

          <Col> bahriddinboltayev75@gmail.com</Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
