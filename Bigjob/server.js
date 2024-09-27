const express = require('express');
const bodyParser = require('body-parser');

const inscriptionRoutes = require('./routes/treter_inscription');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'));


app.use('/inscription', inscriptionRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
