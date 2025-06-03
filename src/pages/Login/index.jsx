import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './login.css';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const login = () => {
        setIsLoading(true);
        setError(''); // pour réinitialiser l'erreur à chaque tentative

        fetch('http://localhost/e-kaly/api/routes/utilisateur/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                mot_passe: password,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error('!response.ok');
                }
                return response.json();
            })
            .then((data) => {
                // console.log('API Response : ', data);
                localStorage.setItem('token', data.token);

                const role = jwtDecode(data.token)['role'];
                if (role === 'agent') {
                    navigate('/agent/repas');
                } else {
                    console.log('Gérant authentifié');
                }
            })
            .catch((error) => {
                console.error('Erreur : ', error);
                setError(
                    `Erreur d'authentification, veuillez vérifier vos informations.`
                );
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(`email ${email} - password ${password}`);
        login();
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-header">
                    <h2 className="text-center e-kaly">e-kaly</h2>
                    <p className="text-center">Commandez vos plats préférés.</p>
                </div>

                {error && (
                    <div
                        className="alert alert-danger text-center mt-3"
                        role="alert"
                    >
                        <i className="fa fa-triangle-exclamation text-danger me-2"></i>{' '}
                        {error}
                    </div>
                )}

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">
                            <i className="fa fa-envelope"></i> Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Entrez votre email"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            <i className="fa fa-lock"></i> Mot de passe
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Entrez votre mot de passe"
                        />
                    </div>

                    {isLoading ? (
                        <button class="btn login-btn text-light">
                            <span class="spinner-border spinner-border-sm"></span>{' '}
                            En cours de vérification...
                        </button>
                    ) : (
                        <button type="submit" className="btn login-btn">
                            <i className="fa fa-right-to-bracket"></i>
                            <span className="ms-2">Se connecter</span>
                        </button>
                    )}

                    <p className="text-center mt-3">
                        Vous n'avez pas un compte ?
                    </p>

                    <button type="button" className="btn signup-btn">
                        <Link
                            to={'/signup'}
                            className="text-dark text-decoration-none"
                        >
                            <i className="fa fa-user-plus"></i>
                            <span className="ms-2">Créer un compte</span>
                        </Link>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
