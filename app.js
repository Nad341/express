const express = require('express');
const usersRoutes = require('./routes/users');

const app = express();
const port = 3000;

app.use('/users', usersRoutes);

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});