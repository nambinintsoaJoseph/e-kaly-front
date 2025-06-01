import Header from '../../components/Header';
import Menu from '../../components/Menu';
import Repas from '../../components/Repas';
import './repasdisponible.css';

/* Images de test */
import gnocchis from '../../assets/gnocchis.jpg';
import pateCarbonara from '../../assets/pate-carbonara.webp';
import BarreRecherche from '../../components/BarreRecherche';

function RepasDisponible() {
    const menu = [
        {
            title: 'Repas disponibles',
            icon: 'fa fa-utensils',
        },
        {
            title: 'Mes commandes',
            icon: 'fa fa-receipt',
        },
        {
            title: 'Mon profil',
            icon: 'fa fa-user',
        },
    ];

    /* Données de test */
    const listeRepas = [
        {
            id: 1,
            nom: 'Gnocchis',
            description:
                "Les gnocchi constituent une préparation culinaire extrêmement courante dans de nombreux pays du monde et présentent des différences notables d'un type à l'autre.",
            photo: gnocchis,
            prix: 25000,
        },
        {
            id: 2,
            nom: 'Pate Carbonara',
            description:
                "La recette est considérée comme étant originaire de Rome Le plat fait partie d'une famille de plats composés de pâtes au porc séché, au fromage et au poivre.",
            photo: pateCarbonara,
            prix: 35000,
        },
        {
            id: 3,
            nom: 'Pate Carbonara',
            description:
                "La recette est considérée comme étant originaire de Rome Le plat fait partie d'une famille de plats composés de pâtes au porc séché, au fromage et au poivre.",
            photo: pateCarbonara,
            prix: 35000,
        },
    ];

    return (
        <div className="d-flex flex-row">
            <Menu menu={menu} />

            {/* Dashboard content */}
            <div className="flex-grow-1 dashboard-content">
                <Header title={'Repas disponibles'} />

                <BarreRecherche />

                <div className="container-repas">
                    {listeRepas.map((rp, id) => (
                        <Repas repas={rp} key={id} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default RepasDisponible;
