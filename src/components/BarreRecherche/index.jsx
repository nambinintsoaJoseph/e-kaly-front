import './barrerecherche.css';

function BarreRecherche() {
    return (
        <div className="search-bar-container">
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="🔎 Trouver un repas"
                    aria-label="Rechercher"
                    aria-describedby="button-search"
                />
                <button className="btn" type="button" id="button-search">
                    <i className="bi bi-search"></i> Rechercher
                </button>
            </div>
        </div>
    );
}

export default BarreRecherche;
