import Header from '../../components/Header';
import Menu from '../../components/Menu';
import Repas from '../../components/Repas';
import BarreRecherche from '../../components/BarreRecherche';
import './repasdisponible.css';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';
import { menuAgent } from '../../data/menuAgent';

function RepasDisponible() {
    const navigate = useNavigate();
    const [listeRepas, setListeRepas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

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

        getRepas();
    }, [navigate]);

    const getRepas = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(
                'http://localhost/e-kaly/api/routes/repas/agent.php',
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
            console.log(data);
            setListeRepas(data.repas || []);
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

            {/* Dashboard content */}
            <div className="flex-grow-1 dashboard-content">
                <Header title={'Repas disponibles'} />

                <BarreRecherche />

                <div className="container-repas">
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
                    ) : listeRepas.length > 0 ? (
                        listeRepas.map((rp) => (
                            <Repas repas={rp} key={rp.id_repas} />
                        ))
                    ) : (
                        <p>Aucun repas disponible</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default RepasDisponible;
