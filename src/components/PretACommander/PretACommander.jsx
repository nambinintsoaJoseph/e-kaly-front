import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PretACommander = () => {
    return (
        <div
            className="py-5 text-white"
            style={{
                background: 'linear-gradient(135deg, #FF7E29 0%, #FF4747 100%)',
            }}
        >
            <Container>
                <Row className="justify-content-center">
                    <Col lg={8} className="text-center">
                        <h1 className="display-5 fw-bold mb-4">
                            Prêt à commander ?
                        </h1>
                        <p className="lead mb-5">
                            Rejoignez des milliers de gourmets qui font
                            confiance à notre plateforme pour leurs repas
                            quotidiens
                        </p>

                        <div className="d-flex justify-content-center gap-3 mb-5">
                            <Button
                                variant="light"
                                size="lg"
                                className="px-4 fw-bold"
                            >
                                <Link
                                    to={'/signup'}
                                    className="text-dark text-decoration-none"
                                >
                                    Commencer maintenant
                                </Link>
                            </Button>
                        </div>
                    </Col>
                </Row>

                <Row className="mt-5 g-4 justify-content-center">
                    <Col md={4} className="text-center">
                        <Card className="border-0 bg-white-10 bg-opacity-10 py-3">
                            <Card.Body>
                                <h2 className="fw-bold display-6">1200+</h2>
                                <p className="mb-0">Agents satisfaits</p>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={4} className="text-center">
                        <Card className="border-0 bg-white-10 bg-opacity-10 py-3">
                            <Card.Body>
                                <h2 className="fw-bold display-6">50+</h2>
                                <p className="mb-0">Plats disponibles</p>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={4} className="text-center">
                        <Card className="border-0 bg-white-10 bg-opacity-10 py-3">
                            <Card.Body>
                                <h2 className="fw-bold display-6">600+</h2>
                                <p className="mb-0">Commandes livrées</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default PretACommander;
