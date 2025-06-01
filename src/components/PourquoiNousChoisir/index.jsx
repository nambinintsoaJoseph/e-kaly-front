import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruckFast,
  faUtensils,
  faMapLocationDot,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";

const PourquoiNousChoisir = () => {
  const features = [
    {
      icon: faTruckFast,
      title: "Livraison rapide",
      description: "Recevez vos plats en 30 minutes maximum",
      color: "text-primary",
    },
    {
      icon: faUtensils,
      title: "Repas de qualité",
      description: "Partenaires triés sur le volet pour votre satisfaction",
      color: "text-danger",
    },
    {
      icon: faMapLocationDot,
      title: "Suivi en temps réel",
      description: "Suivez votre commande de la préparation à la livraison",
      color: "text-success",
    },
    {
      icon: faShieldHalved,
      title: "Paiement sécurisé",
      description: "Transactions 100% sécurisées et protégées",
      color: "text-warning",
    },
  ];

  return (
    <Container className="my-5 py-4">
      <h1 className="text-center mb-4 fw-bold">Pourquoi nous choisir ?</h1>
      <p className="text-center lead mb-5 text-muted">
        Une expérience culinaire exceptionnelle à chaque commande
      </p>

      <Row className="g-4">
        {features.map((feature, index) => (
          <Col key={index} md={6} lg={3}>
            <Card className="h-100 border-0 shadow-sm hover-effect">
              <Card.Body className="text-center p-4">
                <div className={`${feature.color} mb-3`}>
                  <FontAwesomeIcon icon={feature.icon} size="3x" />
                </div>
                <Card.Title className="mb-3 fw-bold">{feature.title}</Card.Title>
                <Card.Text className="text-muted">
                  {feature.description}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Style pour l'effet de survol */}
      <style jsx>{`
        .hover-effect:hover {
          transform: translateY(-5px);
          transition: transform 0.3s ease;
        }
      `}</style>
    </Container>
  );
};

export default PourquoiNousChoisir;