import './header.css';

function Header({ title }) {
    return (
        <div className="pt-2">
            <h2 className="text-center text-dark">{title}</h2>

            <hr />
        </div>
    );
}

export default Header;
