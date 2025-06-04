import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Accueil from './pages/Accueil';
import Login from './pages/Login';
import Signup from './pages/Signup';
import RepasDisponible from './pages/RepasDisponible';
import CommandeRepasAgent from './pages/CommandeRepasAgent';
import MonProfil from './pages/MonProfil';
import CommandesEnCours from './pages/CommandesEnCours';
import AssistantIA from './pages/AssistantIA';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Accueil />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    {/* Agents */}
                    <Route path="/agent/repas" element={<RepasDisponible />} />
                    <Route
                        path="/agent/commande"
                        element={<CommandeRepasAgent />}
                    />
                    <Route path="/agent/profil" element={<MonProfil />} />
                    <Route
                        path="/agent/commendes-en-cours"
                        element={<CommandesEnCours />}
                    />
                    <Route
                        path="/agent/assistance-ia"
                        element={<AssistantIA />}
                    />
                </Routes>
            </Router>
        </>
    );
}

export default App;
