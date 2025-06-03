import './commanderepas.css';

function CommandeRepas({ commande }) {
    return (
        <div className="d-flex flex-column container-commande-repas">
            <div className="header-commande-repas">
                <div>
                    <p className="h5">
                        <i className="fa fa-calendar"></i> Commande du{' '}
                        {commande.date_commande}
                    </p>
                </div>
                <div>
                    <p className="h5">
                        <i className="fa fa-user"></i> Gérant :{' '}
                        {commande.gerant}{' '}
                    </p>
                </div>
            </div>

            <div className="body-commande-repas">
                <h5>Détail des repas</h5>

                {commande.repas.map((item) => (
                    <div key={item.id_repas} className="commande-repas d-flex">
                        <div>
                            <img src={item.photo} className="img-repas" />
                        </div>

                        <div className="flex-grow-1 description-repas">
                            <h4>{item.nom}</h4>
                            <p>{item.description}</p>
                        </div>

                        <div className="description-prix">
                            <p>
                                {item.prix_unitaire} Ar x {item.quantite}
                            </p>
                            <p className="prix h4">
                                {Number(item.sous_total)
                                    .toLocaleString('fr-FR')
                                    .replace(/\s/g, ' ')}{' '}
                                Ar
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="d-flex footer-commande-repas">
                <div className="flex-grow-1">
                    <p className="h4">Total de la commande</p>
                </div>
                <div>
                    <h4 className="prix">
                        {Number(commande.total)
                            .toLocaleString('fr-FR')
                            .replace(/\s/g, ' ')}{' '}
                        Ar
                    </h4>
                </div>
            </div>
        </div>
    );
}

export default CommandeRepas;
