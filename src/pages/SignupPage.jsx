import React, { useState } from 'react';
import loginSignup from '../assets/login-signup.avif';

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
        // Logique pour envoyer les données au backend
    };

    return (
        <div
            className="min-vh-100 d-flex align-items-center"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${loginSignup})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
            }}
        >
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="card shadow-lg">
                            <div className="card-body p-5">
                                <div className="text-center mb-4">
                                    <h2 className="card-title fw-bold text-primary">
                                        Créer un compte
                                    </h2>
                                    <p className="text-muted">
                                        Rejoignez notre plateforme e-kaly
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="nom"
                                                    className="form-label"
                                                >
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
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="prenom"
                                                    className="form-label"
                                                >
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
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label
                                            htmlFor="email"
                                            className="form-label"
                                        >
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

                                    <div className="mb-3">
                                        <label
                                            htmlFor="mot_passe"
                                            className="form-label"
                                        >
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

                                    <div className="mb-4">
                                        <label
                                            htmlFor="role"
                                            className="form-label"
                                        >
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
                                            <option value="gerant">
                                                Gérant
                                            </option>
                                        </select>
                                    </div>

                                    <div className="d-grid gap-2">
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-lg"
                                            style={{
                                                backgroundColor: '#FF7E29',
                                                backgroundImage:
                                                    'linear-gradient(to right, #FF7E29, #FF954D)',
                                                boxShadow:
                                                    '0 4px 15px rgba(255, 126, 41, 0.4)',
                                                transition: 'all 0.3s ease',
                                                border: '1px solid rgba(255, 126, 41, 0.4)',
                                            }}
                                        >
                                            Créer le compte
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
