const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const inscriptionRoutes = require('./routes/treter_inscription'); 

const app = express();

// Activer CORS pour toutes les routes
const corsOptions = {
  origin: 'http://localhost',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Middleware pour analyser les données URL-encoded
app.use(bodyParser.urlencoded({ extended: true }));
// Middleware pour analyser les données JSON
app.use(express.json());
// Middleware pour servir les fichiers statiques
app.use(express.static('./public'));

// Définir la route pour les inscriptions
app.use('/inscription', inscriptionRoutes);

// Définir le port d'écoute
const PORT = 3000;

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});

// Assurez-vous d'avoir ces middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/inscription', (req, res) => {
    console.log('Données reçues:', req.body); // Ajoutez cette ligne
    
    // Vérifiez que toutes les données nécessaires sont présentes
    const { nom, email, motDePasse } = req.body;
    if (!nom || !email || !motDePasse) {
        return res.status(400).json({ message: 'Toutes les données sont requises' });
    }

    // Traitez l'inscription ici
    
    res.status(200).json({ message: 'Inscription réussie' });
});
