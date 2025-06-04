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
    const [isValidating, setIsValidating] = useState(false);
    const [validationMessage, setValidationMessage] = useState('');

    const validerCommande = async () => {
        if (commandes.length === 0) {
            setValidationMessage('Aucun repas à commander');
            return;
        }

        setIsValidating(true);
        setValidationMessage('');
        const token = localStorage.getItem('token');

        try {
            // Créer la commande
            const responseCommande = await fetch(
                'http://localhost/e-kaly/api/routes/commande/creer.php',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!responseCommande.ok) {
                throw new Error('Erreur lors de la création de la commande');
            }

            const dataCommande = await responseCommande.json();
            if (!dataCommande.success) {
                throw new Error(dataCommande.message || 'Erreur inconnue');
            }

            // Ajouter chaque repas à la commande
            for (const repas of commandes) {
                const responseAjout = await fetch(
                    'http://localhost/e-kaly/api/routes/commanderepas/ajouter.php',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            id_repas: repas.id_repas,
                            id_commande: dataCommande.id_commande,
                            quantite: repas.quantity,
                        }),
                    }
                );

                if (!responseAjout.ok) {
                    throw new Error("Erreur lors de l'ajout d'un repas");
                }

                const dataAjout = await responseAjout.json();
                if (!dataAjout.success) {
                    throw new Error(dataAjout.message || 'Erreur inconnue');
                }
            }

            // Si tout réussit
            setValidationMessage('Commande validée avec succès!');
            localStorage.removeItem('commandesEnCours');
            setCommandes([]);
            window.dispatchEvent(new Event('storage'));
            window.dispatchEvent(new CustomEvent('commandUpdated'));
        } catch (error) {
            console.error('Erreur:', error);
            setValidationMessage(`Erreur: ${error.message}`);
        } finally {
            setIsValidating(false);
        }
    };

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

        // Déclencher la mise à jour du badge
        window.dispatchEvent(new Event('storage'));
        window.dispatchEvent(new CustomEvent('commandUpdated'));
    };

    const removeCommande = (id) => {
        const updatedCommandes = commandes.filter((cmd) => cmd.id_repas !== id);
        setCommandes(updatedCommandes);
        localStorage.setItem(
            'commandesEnCours',
            JSON.stringify(updatedCommandes)
        );

        // Déclencher la mise à jour du badge
        window.dispatchEvent(new Event('storage'));
        window.dispatchEvent(new CustomEvent('commandUpdated'));
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

                <div className="total-section mt-4 p-3 bg-light rounded">
                    <h4 className="text-end">
                        Total: {calculateTotal().toLocaleString('fr-FR')} Ar
                    </h4>

                    {/* Bouton de validation */}
                    <div className="d-flex justify-content-end mt-3">
                        <button
                            className="btn btn-success"
                            onClick={validerCommande}
                            disabled={isValidating || commandes.length === 0}
                        >
                            {isValidating ? (
                                <>
                                    <span
                                        className="spinner-border spinner-border-sm me-2"
                                        role="status"
                                        aria-hidden="true"
                                    ></span>
                                    Validation en cours...
                                </>
                            ) : (
                                'Valider la commande'
                            )}
                        </button>
                    </div>

                    {/* Message de validation */}
                    {validationMessage && (
                        <div
                            className={`alert ${
                                validationMessage.includes('Erreur')
                                    ? 'alert-danger'
                                    : 'alert-success'
                            } mt-3`}
                        >
                            {validationMessage}
                        </div>
                    )}
                </div>

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
