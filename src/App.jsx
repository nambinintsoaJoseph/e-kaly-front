import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Accueil from './pages/Accueil';
import Login from './pages/Login';
import SignupPage from './pages/SignupPage';
import RepasDisponible from './pages/agent/RepasDisponible';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Accueil />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignupPage />} />

                    <Route path="/agent/repas" element={<RepasDisponible />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
