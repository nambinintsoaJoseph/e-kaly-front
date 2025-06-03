import './repas.css';

function Repas({ repas }) {
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
                            {/* Séparateur des milliers (espace) */}
                            {Number(repas.prix)
                                .toLocaleString('fr-FR')
                                .replace(/\s/g, ' ')}{' '}
                            Ar
                        </h4>
                    </div>
                </div>

                <p className="card-text">{repas.description}</p>

                <div className="d-flex justify-content-center">
                    <a href="#" className="btn btn-primary ajouter-commande">
                        <i className="fa fa-plus"></i> Ajouter au commande
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Repas;
