const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

// Créer une base de données SQLite et une table si elles n'existent pas
const db = new sqlite3.Database('mydatabase.db');
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)');
});

// Route pour afficher tous les utilisateurs
router.get('/', (req, res) => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(rows);
    }
  });
});

// Ajouter un utilisateur
router.post('/:name', (req, res) => {
  const name = req.params.name;
  db.run('INSERT INTO users (name) VALUES (?)', [name], function (err) {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.send(`Utilisateur ajouté avec l'ID : ${this.lastID}`);
    }
  });
});

// Supprimer un utilisateur
router.delete('/:name', (req, res) => {
  const name = req.params.name;
  db.run('DELETE FROM users WHERE name = ?', [name], function (err) {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.send(`Utilisateur supprimé avec le nom : ${name}`);
    }
  });
});

// Mettre à jour un utilisateur
router.put('/:name/:newName', (req, res) => {
  const name = req.params.name;
  const newName = req.params.newName;
  db.run('UPDATE users SET name = ? WHERE name = ?', [newName, name], function (err) {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.send(`Utilisateur mis à jour avec le nom : ${newName}`);
    }
  });
});

module.exports = router;