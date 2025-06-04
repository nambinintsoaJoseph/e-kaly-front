import './menu.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Menu({ menu }) {
    const [totalItems, setTotalItems] = useState(0);

    // Fonction pour calculer le total
    const updateTotalItems = () => {
        try {
            const commandes = JSON.parse(
                localStorage.getItem('commandesEnCours') || '[]'
            );
            const total = commandes.reduce(
                (sum, item) => sum + (item.quantity || 1),
                0
            );
            setTotalItems(total);
        } catch (error) {
            console.error('Erreur de lecture des commandes:', error);
            setTotalItems(0);
        }
    };

    useEffect(() => {
        updateTotalItems();

        const handleCommandUpdate = () => updateTotalItems();

        window.addEventListener('commandUpdated', handleCommandUpdate);
        window.addEventListener('storage', handleCommandUpdate);

        return () => {
            window.removeEventListener('commandUpdated', handleCommandUpdate);
            window.removeEventListener('storage', handleCommandUpdate);
        };
    }, []);

    return (
        <div className="menu-container bg-dark d-flex flex-column">
            <div className="head pe-5">
                <h5 className="text-center text-light pt-4">Dashboard</h5>
            </div>

            <div className="flex-grow-1 mt-5">
                <h5 className="pe-5 text-light text-center">Navigation</h5>
                <ul className="nav flex-column text-light">
                    {menu.map((m, id) => (
                        <li key={id} className="nav-item position-relative">
                            <Link
                                to={m.path}
                                className="p-3 text-light text-decoration-none d-flex align-items-center"
                            >
                                <i className={`${m.icon} me-2`}></i>
                                <span>{m.title}</span>
                                {/* Modification clé ici - comparer avec le path */}
                                {m.path === '/agent/commendes-en-cours' &&
                                    totalItems > 0 && (
                                        <span className="badge bg-danger rounded-pill ms-2">
                                            {totalItems}
                                        </span>
                                    )}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="p-2 d-flex justify-content-center">
                <button className="btn btn-danger me-4">
                    <i className="me-2 fa fa-sign-out-alt"></i> Déconnexion
                </button>
            </div>
        </div>
    );
}

export default Menu;
