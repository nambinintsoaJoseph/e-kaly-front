import { useState } from 'react';
import './signup.css';

const SignupPage = () => {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        mot_passe: '',
        role: 'agent',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Données soumises:', formData);
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
                            className="btn btn-primary btn-lg"
                        >
                            <i className="fa fa-user-plus mt-2"></i> Créer le
                            compte
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
