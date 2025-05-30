import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUserPlus,
    faSignInAlt,
    faEnvelope,
    faLock,
} from '@fortawesome/free-solid-svg-icons';
import loginSignup from '../assets/login-signup.avif';
import { Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    return (
        <div
            className="container-fluid vh-100"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${loginSignup})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
            }}
        >
            <div className="row justify-content-center align-items-center h-100">
                <div className="col-md-5 col-lg-4">
                    <div
                        className="card shadow-lg border-0 overflow-hidden"
                        style={{ backdropFilter: 'blur(2px)' }}
                    >
                        <div
                            className="card-header text-white text-center py-4"
                            style={{
                                backgroundColor: '#FF7E29',
                                borderBottom: '3px solid rgba(255,255,255,0.2)',
                            }}
                        >
                            <h1 className="mb-1 display-5 fw-bold">e-kaly</h1>
                            <p className="mb-0 opacity-90">
                                Commandez vos plats préférés en quelques clics
                            </p>
                        </div>

                        <div className="card-body p-4 bg-white">
                            {error && (
                                <div className="alert alert-danger alert-dismissible fade show">
                                    {error}
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => setError('')}
                                    ></button>
                                </div>
                            )}

                            <form>
                                <div className="mb-4">
                                    <label
                                        htmlFor="email"
                                        className="form-label text-secondary text-uppercase small fw-bold"
                                    >
                                        <FontAwesomeIcon
                                            icon={faEnvelope}
                                            className="me-2"
                                        />
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control form-control-lg border border-2"
                                        id="email"
                                        style={{
                                            backgroundColor:
                                                'rgba(255, 255, 255, 0.8)',
                                        }}
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="password"
                                        className="form-label text-secondary text-uppercase small fw-bold"
                                    >
                                        <FontAwesomeIcon
                                            icon={faLock}
                                            className="me-2"
                                        />
                                        Mot de passe
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control form-control-lg border border-2"
                                        id="password"
                                        style={{
                                            backgroundColor:
                                                'rgba(255, 255, 255, 0.8)',
                                        }}
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="d-grid gap-3">
                                    <button
                                        type="submit"
                                        className="btn btn-lg w-100 fw-bold text-white py-3 border-0"
                                        style={{
                                            backgroundColor: '#FF7E29',
                                            backgroundImage:
                                                'linear-gradient(to right, #FF7E29, #FF954D)',
                                            boxShadow:
                                                '0 4px 15px rgba(255, 126, 41, 0.4)',
                                            transition: 'all 0.3s ease',
                                        }}
                                        onMouseOver={(e) =>
                                            (e.target.style.opacity = 0.9)
                                        }
                                        onMouseOut={(e) =>
                                            (e.target.style.opacity = 1)
                                        }
                                    >
                                        <FontAwesomeIcon
                                            icon={faSignInAlt}
                                            className="me-2"
                                        />
                                        Se connecter
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary btn-lg w-100 fw-bold py-3"
                                        style={{
                                            transition: 'all 0.3s ease',
                                            borderColor: '#dee2e6',
                                        }}
                                        onMouseOver={(e) => {
                                            e.target.style.backgroundColor =
                                                '#f8f9fa';
                                            e.target.style.borderColor =
                                                '#FF7E29';
                                            e.target.style.color = '#FF7E29';
                                        }}
                                        onMouseOut={(e) => {
                                            e.target.style.backgroundColor =
                                                'transparent';
                                            e.target.style.borderColor =
                                                '#dee2e6';
                                            e.target.style.color = '#6c757d';
                                        }}
                                    >
                                        <Link
                                            to="/signup"
                                            className="text-dark text-decoration-none"
                                        >
                                            <FontAwesomeIcon
                                                icon={faUserPlus}
                                                className="me-2"
                                            />
                                            Créer un compte
                                        </Link>
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="card-footer bg-white text-center py-3 border-0">
                            <p className="mb-0 small text-muted">
                                © {new Date().getFullYear()} e-kaly • Tous
                                droits réservés
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
