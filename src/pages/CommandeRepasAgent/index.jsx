import React from 'react';
import Menu from '../../components/Menu';
import Header from '../../components/Header';
import BarreRecherche from '../../components/BarreRecherche';
import './commanderepasagent.css';
import CommandeRepas from '../../components/CommandeRepas';

// Test
import painChoco from '../../assets/pain-choco.webp';
import macaroniFromage from '../../assets/macaroni-fromage.jpg';

// Données de test (simulant la réponse de l'API)
const commandes = {
    id_commande: 3,
    date_commande: '27-05-2025 - 18:23:50',
    gerant: 'Jean Pierre',
    repas: [
        {
            id_repas: 21,
            nom: 'Pain au chocolat',
            description: 'Le pain au chocolat...',
            photo: painChoco,
            prix_unitaire: 3000,
            quantite: 2,
            sous_total: 6000,
        },
        {
            id_repas: 22,
            nom: 'Macaroni au fromage',
            description: 'Le macaroni au fromage, familièrement...',
            photo: macaroniFromage,
            prix_unitaire: 10000,
            quantite: 1,
            sous_total: 10000,
        },
    ],
    total: 16000,
};

const CommandeRepasAgent = () => {
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

    return (
        <div className="d-flex flex-row">
            <Menu menu={menu} />

            <div className="flex-grow-1 dashboard-content">
                <Header title={'Mes commandes'} />

                <BarreRecherche />

                <div className="container-commande">
                    <CommandeRepas commande={commandes} />
                </div>
            </div>
        </div>
    );
};

export default CommandeRepasAgent;
