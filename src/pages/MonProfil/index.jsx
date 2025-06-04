import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import BarreRecherche from '../../components/BarreRecherche';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import Profil from '../../components/Profil';
import './monprofil.css';
import { menuAgent } from '../../data/menuAgent';

function MonProfil() {
    const [profil, setProfil] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const decoded = jwtDecode(token);
            setProfil(decoded);
        } catch (error) {
            console.error('Erreur de décodage du token:', error);
            localStorage.removeItem('token');
            navigate('/login');
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    return (
        <div className="d-flex flex-row">
            <Menu menu={menuAgent} />

            <div className="flex-grow-1 dashboard-content">
                <Header title={'Mon profil'} />
                <BarreRecherche />

                {loading ? (
                    <div
                        className="d-flex justify-content-center"
                        style={{ height: '120px' }}
                    >
                        <div class="spinner-border text-success"></div>
                        <div className="ms-2">Chargement en cours...</div>
                    </div>
                ) : (
                    <div>
                        <Profil profil={profil} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default MonProfil;
