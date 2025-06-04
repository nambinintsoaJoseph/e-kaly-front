import './profil.css';
function Profil({ profil }) {
    return (
        <div className="component-container-profil">
            <h4 className="text-center">Vos informations personnelles</h4>

            <div className="d-flex header-profil">
                <div>
                    <p className="avatar text-center">
                        {profil.nom[0]}
                        {profil.prenom[0]}
                    </p>
                </div>

                <div className="align-self-center ms-2">
                    <p className="h3">
                        {profil.nom} {profil.prenom}
                    </p>
                    <p className="badge-role text-center">
                        {profil.role.charAt(0).toUpperCase() +
                            profil.role.slice(1)}
                    </p>
                </div>
            </div>

            <div className="body-profil">
                <p className="col info">
                    <i className="fa fa-id-card"></i> Identifiant :{' '}
                    {profil.id_utilisateur}
                </p>
                <p className="col info">
                    {' '}
                    <i className="fa fa-envelope profil-icon"></i> Email :{' '}
                    {profil.email}
                </p>
                <p className="col info">
                    <i className="fa fa-user-circle profil-icon"></i> Nom :{' '}
                    {profil.nom}
                </p>
                <p className="col info">
                    <i className="fa fa-user-circle profil-icon"></i> Prénom(s):{' '}
                    {profil.prenom}
                </p>
                <p className="info">
                    <i className="fa fa-user-shield profil-icon"></i> Rôle :{' '}
                    {profil.role}
                </p>
            </div>
        </div>
    );
}

export default Profil;
