import { Link } from 'react-router-dom';
import './cta.css';

function Cta() {
    return (
        <header>
            <div>
                <h1>
                    Bienvenue sur <span>e-kaly</span>{' '}
                </h1>
            </div>
            <div>
                <p>
                    Commandez facilement vos repas. Livraison rapide et plats
                    délicieux à portée de clic !
                </p>
            </div>
            <div>
                <button>
                    <Link
                        to="/signup"
                        className="text-light text-decoration-none"
                    >
                        Créer un compte
                    </Link>
                </button>
                <button>
                    <Link
                        to="/login"
                        className="text-secondary text-decoration-none"
                    >
                        Se connecter
                    </Link>
                </button>
            </div>
        </header>
    );
}

export default Cta;
