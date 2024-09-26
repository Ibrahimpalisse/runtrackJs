const express = require('express');
const bcrypt = require('bcrypt');
const fs = require('fs');
const router = express.Router();

const usersFilePath = './data/users.json'; // Assurez-vous que ce chemin est correct

router.post('/', (req, res) => {
    const { login, email, password } = req.body;

    // Vérifier si l'email se termine par @laplateforme.io
    if (!email.endsWith('@laplateforme.io')) {
        return res.status(400).json({ error: "L'email doit contenir @laplateforme.io" });
    }

    // Lire le fichier JSON
    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Erreur de lecture du fichier" });
        }

        const users = JSON.parse(data);

        // Vérifier si l'email ou le login existe déjà
        const existingUser = users.find(user => user.email === email || user.login === login);
        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(400).json({ error: "Cet email est déjà utilisé." });
            }
            if (existingUser.login === login) {
                return res.status(400).json({ error: "Ce login est déjà utilisé." });
            }
        } else {
            // Hash le mot de passe et ajouter l'utilisateur
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({ error: "Erreur lors du hachage du mot de passe" });
                }

                const newUser = { login, email, password: hash };
                users.push(newUser);

                // Écrire le fichier JSON
                fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
                    if (err) {
                        return res.status(500).json({ error: "Erreur lors de l'écriture du fichier" });
                    }
                    res.status(200).json({ message: "Inscription réussie" });
                });
            });
        }
    });
});

module.exports = router;
