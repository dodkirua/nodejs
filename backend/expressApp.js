const express = require("express");
const sequelize = require('./db');
const ProductsController = require('./Controller/ProductsController');

// initialisation de Express
const expressApp = express();
expressApp.use('/assets', express.static(__dirname + '/../public/build'));
expressApp.use(express.json());


expressApp.use((req, res, next) =>{
    console.log("Requete recu => " + req.url);
    next();
})

expressApp.use((req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods','GET, POST');
    res.status(200);
    next();
})

expressApp.get('/', (req, res, next) => {
    const response = {
        message : "Hello World !"
    };
    res.json(response);
    next();
});

// Get products Route
expressApp.get('/products', (req, res, next) =>
    ProductsController.getProducts(req, res, next, sequelize)
);

// ajout de produits
expressApp.post('/product/add', (req,res,next)=>{
    ProductsController.addProduct(req,res,next,sequelize)
});

expressApp.use((req,res, next) => {
    if (!req.route) {
        res
            .status(404)
            .end()
        ;
    }
    next();
});

expressApp.use((req, res) => {
    console.log("code reponse : " + res.statusCode);
    console.log("Requête terminée, réponse envoyé au client")
})

module.exports = expressApp;