import { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-header">
                    <h2 className="text-center e-kaly">e-kaly</h2>
                    <p className="text-center">Commandez vos plats préférés.</p>
                </div>

                <form className="login-form">
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

                    <button type="button" className="btn login-btn">
                        <i className="fa fa-right-to-bracket"></i>
                        <span className="ms-2">Se connecter</span>
                    </button>

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
