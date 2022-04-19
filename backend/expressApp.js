const express = require("express");
const expressApp = express();


expressApp.use( (req, res, next) => {
    console.log('requête reçue =>' + req.url);
    next();
});

expressApp.use((req,res,next) => {
    res.send("Hello world !");
    next();
});

expressApp.use((req,res) => {
    console.log("Code response: " + res.statusCode);
    console.log("Requête terminée, réponse envoyée au client");
});

module.exports = expressApp;