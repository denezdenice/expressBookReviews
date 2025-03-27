const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Vérifiez si le nom d'utilisateur et le mot de passe sont fournis
  if (!username || !password) {
    return res.status(400).json({ message: "Nom d'utilisateur et mot de passe sont requis" });
  }

  // Vérifiez si le nom d'utilisateur est valide
  if (!users[username]) {
    return res.status(401).json({ message: "Nom d'utilisateur ou mot de passe incorrect" });
  }

  // Vérifiez si le nom d'utilisateur et le mot de passe correspondent à ceux enregistrés
  if (users[username] !== password) {
    return res.status(401).json({ message: "Nom d'utilisateur ou mot de passe incorrect" });
  }

  // Générez un jeton JSON Web (JWT) pour sauvegarder les informations d'identification de l'utilisateur pour la session
  const token = jwt.sign({ username }, 'secretkey', { expiresIn: '1h' });

  return res.status(200).json({ message: "Connecté avec succès", token });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
