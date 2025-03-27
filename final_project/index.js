const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer", session({ secret: "fingerprint_customer", resave: true, saveUninitialized: true }))

app.use("/customer/auth/*", function auth(req, res, next) {
  // Vérifiez si la session est valide
  if (req.session && req.session.authenticated) {
    // Si la session est valide, appelez la fonction next() pour continuer
    next();
  } else {
    // Si la session n'est pas valide, renvoyez une erreur 401
    res.status(401).send({ message: "Vous devez être connecté pour accéder à cette page" });
  }
});

const PORT = 5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log("Server is running"));
