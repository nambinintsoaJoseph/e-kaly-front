import './repas.css';

function Repas({ repas }) {
    const ajouterACommande = () => {
        try {
            const commandesExistantes = JSON.parse(
                localStorage.getItem('commandesEnCours') || '[]'
            );

            const existeDejaIndex = commandesExistantes.findIndex(
                (cmd) => cmd.id_repas === repas.id_repas
            );

            if (existeDejaIndex === -1) {
                const nouvellesCommandes = [
                    ...commandesExistantes,
                    { ...repas, quantity: 1 },
                ];
                localStorage.setItem(
                    'commandesEnCours',
                    JSON.stringify(nouvellesCommandes)
                );
            } else {
                commandesExistantes[existeDejaIndex].quantity += 1;
                localStorage.setItem(
                    'commandesEnCours',
                    JSON.stringify(commandesExistantes)
                );
            }

            // Déclencher à la fois l'événement storage et un événement personnalisé
            window.dispatchEvent(new Event('storage'));
            window.dispatchEvent(new CustomEvent('commandUpdated'));

            alert('Repas ajouté à la commande!');
        } catch (error) {
            console.error("Erreur lors de l'ajout à la commande:", error);
            localStorage.setItem(
                'commandesEnCours',
                JSON.stringify([{ ...repas, quantity: 1 }])
            );
            window.dispatchEvent(new Event('storage'));
            window.dispatchEvent(new CustomEvent('commandUpdated'));
        }
    };

    return (
        <div className="card">
            <img
                className="card-img-top"
                src={`http://localhost/e-kaly${repas.photo}`}
                alt="Card image"
            />
            <div className="card-body">
                <div className="d-flex justify-content-around">
                    <div>
                        <h4 className="card-title">{repas.nom}</h4>
                    </div>

                    <div>
                        <h4 className="card-title prix">
                            {Number(repas.prix)
                                .toLocaleString('fr-FR')
                                .replace(/\s/g, ' ')}{' '}
                            Ar
                        </h4>
                    </div>
                </div>

                <p className="card-text">{repas.description}</p>

                <div className="d-flex justify-content-center">
                    <button
                        className="btn btn-primary ajouter-commande"
                        onClick={ajouterACommande}
                    >
                        <i className="fa fa-plus"></i> Ajouter au commande
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Repas;
