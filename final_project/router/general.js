const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  // Vérifier si le username et le password sont fournis
  if (!username || !password) {
    return res.status(400).json({ message: "Username et password sont requis" });
  }

  // Vérifier si le username existe déjà
  if (users[username]) {
    return res.status(400).json({ message: "Username déjà existant" });
  }

  // Enregistrer le nouvel utilisateur
  users[username] = password;

  return res.status(201).json({ message: "Utilisateur enregistré avec succès" });
});


// Get the book list available in the shop
public_users.get('/', function (req, res) {
  // Format the books object with indentation for readability
  const formattedBooks = JSON.stringify(books, null, 2);
  // Send the formatted books data with a 200 OK status
  return res.status(200).send(formattedBooks);
});


// Get book details based on ISBN
public_users.get('/isbn/:isbn', function(req, res) {
  const isbn = req.params.isbn;

  if (!isbn) {
    return res.status(400).json({ message: "ISBN requis !" });
  }

  // Envoi direct sans vérifier l'existence
  return res.status(200).send(JSON.stringify(books[isbn], null, 2));
});
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  const authorBooks = [];

  // Itérer à travers les livres et vérifier si l'auteur correspond à celui fourni dans les paramètres de la requête
  for (const bookId in books) {
    if (books[bookId].author.toLowerCase() === author.toLowerCase()) {
      authorBooks.push(books[bookId]);
    }
  }

  if (authorBooks.length > 0) {
    return res.status(200).json(authorBooks);
  } else {
    return res.status(404).json({ message: `Aucun livre trouvé pour l'auteur ${author}` });
  }
});


// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  const titleBooks = [];

  // Itérer à travers les livres et vérifier si le titre correspond à celui fourni dans les paramètres de la requête
  for (const bookId in books) {
    if (books[bookId].title.toLowerCase().includes(title.toLowerCase())) {
      titleBooks.push(books[bookId]);
    }
  }

  if (titleBooks.length > 0) {
    return res.status(200).json(titleBooks);
  } else {
    return res.status(404).json({ message: `Aucun livre trouvé pour le titre ${title}` });
  }
});


//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;

  if (books[isbn] && books[isbn].reviews) {
    return res.status(200).json(books[isbn].reviews);
  } else {
    return res.status(404).json({ message: `NOT FOUND ISBN ${isbn}` });
  }
});



module.exports.general = public_users;
