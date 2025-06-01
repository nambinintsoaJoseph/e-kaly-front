import './menu.css';

function Menu({ menu }) {
    return (
        <div className="menu-container bg-dark d-flex flex-column">
            <div className="head pe-5">
                <h5 className="text-center text-light pt-4">Dashboard</h5>
            </div>

            <div className="flex-grow-1 mt-5">
                <h5 className="pe-5 text-light text-center">Navigation</h5>
                <ul className="nav flex-column text-light">
                    {menu.map((m, id) => (
                        <li key={id} className="p-3">
                            <i className={`${m.icon} me-2`}></i> {'  '}{' '}
                            {m.title}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="p-2 d-flex justify-content-center">
                <button className="btn btn-danger me-4">
                    <i className="me-2 fa fa-sign-out-alt"></i> Déconnexion
                </button>
            </div>
        </div>
    );
}

export default Menu;
