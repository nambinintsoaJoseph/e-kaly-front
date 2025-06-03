import { useState } from 'react';
import './signup.css';
import { Link } from 'react-router-dom';

const SignupPage = () => {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        mot_passe: '',
        role: 'agent',
    });
    const [status, setStatus] = useState({
        success: false,
        message: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const signup = () => {
        setIsLoading(true);
        fetch('http://localhost/e-kaly/api/routes/utilisateur/creer.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error('Erreur réseau');
                }
                return response.json();
            })
            .then((data) => {
                console.log('API Response : ', data);
                setStatus({
                    success: data.success,
                    message: data.message,
                });

                if (data.success) {
                    setFormData({
                        nom: '',
                        prenom: '',
                        email: '',
                        mot_passe: '',
                        role: 'agent',
                    });
                }
            })
            .catch((error) => console.error('Erreur :', error))
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        signup();
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <div className="signup-header">
                    <h2 className="text-center e-kaly">e-kaly</h2>
                    <p>Rejoignez notre plateforme e-kaly.</p>
                </div>

                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="nom" className="form-label">
                            Nom
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="nom"
                            name="nom"
                            value={formData.nom}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="prenom" className="form-label">
                            Prénom
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="prenom"
                            name="prenom"
                            value={formData.prenom}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="mot_passe" className="form-label">
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="mot_passe"
                            name="mot_passe"
                            value={formData.mot_passe}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="role" className="form-label">
                            Rôle
                        </label>
                        <select
                            className="form-select"
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                        >
                            <option value="agent">Agent</option>
                            <option value="gerant">Gérant</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <button
                            type="submit"
                            className={`btn btn-lg ${
                                isLoading ? 'btn-loading' : 'btn-primary'
                            }`}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span
                                        className="spinner-border spinner-border-sm"
                                        role="status"
                                        aria-hidden="true"
                                    ></span>
                                    <span className="ms-2">
                                        Création en cours...
                                    </span>
                                </>
                            ) : (
                                <>
                                    <i className="fa fa-user-plus mt-2"></i>{' '}
                                    Créer le compte
                                </>
                            )}
                        </button>
                    </div>

                    {status.success && (
                        <div className="alert alert-success">
                            <p className="text-center">{status.message}</p>
                            <Link to={'/login'}>
                                <p className="text-center">
                                    Se connecter maintenant.
                                </p>
                            </Link>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
