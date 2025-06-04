import React from 'react';
import Menu from '../../components/Menu';
import Header from '../../components/Header';
import BarreRecherche from '../../components/BarreRecherche';
import './commanderepasagent.css';
import CommandeRepas from '../../components/CommandeRepas';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { menuAgent } from '../../data/menuAgent';

const CommandeRepasAgent = () => {
    const navigate = useNavigate();
    const [commandes, setCommandes] = useState({});
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        // Vérification du token
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const role = jwtDecode(token)['role'];
            if (role !== 'agent') {
                navigate('/login');
                return;
            }
        } catch (error) {
            console.error('Erreur de décodage du token:', error);
            navigate('/login');
            return;
        }
        getCommandes();
    }, [navigate]);

    const getCommandes = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(
                'http://localhost/e-kaly/api/routes/commande/agent.php',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des repas');
            }

            const data = await response.json();
            setCommandes(data.commandes || []);
        } catch (error) {
            console.error('Erreur:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="d-flex flex-row">
            <Menu menu={menuAgent} />

            <div className="flex-grow-1 dashboard-content">
                <Header title={'Mes commandes'} />

                <BarreRecherche />

                <div className="container-commande">
                    {isLoading ? (
                        <div
                            className="d-flex justify-content-center"
                            style={{ height: '120px' }}
                        >
                            <div class="spinner-border text-success"></div>
                            <div className="ms-2">Chargement en cours...</div>
                        </div>
                    ) : error ? (
                        <p className="error-message">Erreur: {error}</p>
                    ) : commandes.length > 0 ? (
                        commandes.map((cm, index) => (
                            <CommandeRepas commande={cm} key={index} />
                        ))
                    ) : (
                        <p>Aucune commande pour l'instant.</p>
                    )}
                </div>
            </div>
            {console.log(commandes)}
        </div>
    );
};

export default CommandeRepasAgent;
