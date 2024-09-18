const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'users'
});

connection.connect((err) => {
    if (err) {
        console.log('Error de connexion à la base de données.'.err);
        return;
 }else {
     console.log('Connexion reussie avec la base de données');
 }
});




