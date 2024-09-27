const fs = require('fs');
const path = require('path');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const router = express.Router();

const saltRounds = 10;  // Nombre de cycles de hachage pour bcrypt
const filePath = path.join(__dirname, '../data/users.json');

router.post('/', async (req, res) => {
    try {
        const { login, email, password } = req.body;

       
        let utilisateurs = [];
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf-8');
            utilisateurs = JSON.parse(data);
        }

       
        const loginExists = utilisateurs.some(user => user.login === login);
        const emailExists = utilisateurs.some(user => user.email === email);

        if (loginExists) {
            return res.status(400).json({ error: 'login_exists' });
        }
        if (emailExists) {
            return res.status(400).json({ error: 'email_exists' });
        }

   
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        
        const newUser = { id: uuidv4(), login, email, password: hashedPassword };
        utilisateurs.push(newUser);

        
        fs.writeFileSync(filePath, JSON.stringify(utilisateurs, null, 2), 'utf-8');

        // Réponse de succès
        res.status(200).json({ message: 'Inscription réussie' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

module.exports = router;
