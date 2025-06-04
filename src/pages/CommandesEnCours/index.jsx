import Header from '../../components/Header';
import Menu from '../../components/Menu';
import './commandesencours.css';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';
import { menuAgent } from '../../data/menuAgent';

function CommandesEnCours() {
    const navigate = useNavigate();
    const [commandes, setCommandes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

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

        loadCommandes();
    }, [navigate]);

    const loadCommandes = () => {
        try {
            const savedCommandes = localStorage.getItem('commandesEnCours');
            if (savedCommandes) {
                setCommandes(JSON.parse(savedCommandes));
            } else {
                setCommandes([]);
            }
        } catch (error) {
            console.error('Erreur de lecture des commandes:', error);
            setError(error);
            setCommandes([]);
        } finally {
            setIsLoading(false);
        }
    };

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return;

        const updatedCommandes = commandes.map((cmd) => {
            if (cmd.id_repas === id) {
                return { ...cmd, quantity: newQuantity };
            }
            return cmd;
        });

        setCommandes(updatedCommandes);
        localStorage.setItem(
            'commandesEnCours',
            JSON.stringify(updatedCommandes)
        );
    };

    const removeCommande = (id) => {
        const updatedCommandes = commandes.filter((cmd) => cmd.id_repas !== id);
        setCommandes(updatedCommandes);
        localStorage.setItem(
            'commandesEnCours',
            JSON.stringify(updatedCommandes)
        );
    };

    const calculateSubtotal = (prix, quantity) => {
        return prix * quantity;
    };

    const calculateTotal = () => {
        return commandes.reduce(
            (total, cmd) => total + cmd.prix * cmd.quantity,
            0
        );
    };

    return (
        <div className="d-flex flex-row">
            <Menu menu={menuAgent} />

            <div className="flex-grow-1 dashboard-content">
                <Header title={'Commandes en cours'} />

                <div className="container-commandes">
                    {isLoading ? (
                        <div
                            className="d-flex justify-content-center"
                            style={{ height: '120px' }}
                        >
                            <div className="spinner-border text-success"></div>
                            <div className="ms-2">Chargement en cours...</div>
                        </div>
                    ) : error ? (
                        <p className="error-message">Erreur: {error}</p>
                    ) : commandes.length > 0 ? (
                        <>
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Repas</th>
                                            <th>Prix unitaire</th>
                                            <th>Quantité</th>
                                            <th>Sous-total</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {commandes.map((cmd) => (
                                            <tr key={cmd.id_repas}>
                                                <td>{cmd.nom}</td>
                                                <td>
                                                    {Number(
                                                        cmd.prix
                                                    ).toLocaleString(
                                                        'fr-FR'
                                                    )}{' '}
                                                    Ar
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <button
                                                            className="btn btn-sm btn-outline-secondary"
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    cmd.id_repas,
                                                                    cmd.quantity -
                                                                        1
                                                                )
                                                            }
                                                        >
                                                            -
                                                        </button>
                                                        <span className="mx-2">
                                                            {cmd.quantity}
                                                        </span>
                                                        <button
                                                            className="btn btn-sm btn-outline-secondary"
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    cmd.id_repas,
                                                                    cmd.quantity +
                                                                        1
                                                                )
                                                            }
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </td>
                                                <td>
                                                    {calculateSubtotal(
                                                        cmd.prix,
                                                        cmd.quantity
                                                    ).toLocaleString(
                                                        'fr-FR'
                                                    )}{' '}
                                                    Ar
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() =>
                                                            removeCommande(
                                                                cmd.id_repas
                                                            )
                                                        }
                                                    >
                                                        Supprimer
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="total-section mt-4 p-3 bg-light rounded">
                                <h4 className="text-end">
                                    Total:{' '}
                                    {calculateTotal().toLocaleString('fr-FR')}{' '}
                                    Ar
                                </h4>
                            </div>
                        </>
                    ) : (
                        <p>Aucune commande en cours</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CommandesEnCours;
