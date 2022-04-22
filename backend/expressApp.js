const express = require("express");
const mongoose = require('mongoose');
const Product = require('./model/Product');

// initialisation de Express
const expressApp = express();
expressApp.use('/assets', express.static(__dirname + '/../public/build'));
expressApp.use(express.json());

// Initialisation de Mongoose
dbConnect = async () => await mongoose.connect(
    "mongodb+srv://dodkirua:s8GHZbXVBgfXKAnA@cluster0.n3nsa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

dbConnect()
    .catch(err=>{
        console.error("Erreur de connexion a la db : "+ err);
        process.exit(1)
    })

expressApp.use((req, res, next) =>{
    console.log("Requête reçu => " + req.url);
    next();
});

//gestion d'erreur
const dataError = (res, message, err) => {
    res.status(400);
    console.error(message, err);
    res.json({error:message});
};

expressApp.use((req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods','GET, POST');
    res.status(200);
    next();
})



expressApp.get('/', (req, res, next) => {
   res.json({message: "Hello world"});
    next();
});

// ajout de produits
expressApp.post('/product/add', (req,res,next)=>{
    const product = new Product({...req.body});
    product.save()
        .then(() => {
            res.status(201);
            res.json({message: "ok"});
        })
        .catch(err => dataError(res, "Impossible d'enregistrer le produit",err))
        .finally(() => next())
    ;
});

// find all product
expressApp.get('/products', (req, res, next) => {
   Product.find()
       .then(products => {
           res.status(200);
           res.json(products)
       })
       .catch(err => dataError(res,"Impossible de récupérer les produits",err))
       .finally(() => next())
    ;
});

// find a product by id
expressApp.get('/product/:id', (req, res, next) =>{
    Product.findById(req.params.id)
        .then(product => res.json(product))
        .catch(err => dataError(res,"Erreur en récupérant le produit ",err))
        .finally(() => next())
    ;
});

// find a product by parameter with filter
expressApp.get('/product/find/:key-:value', (req, res, next) =>{
    const search= {};
    search[req.params.key] = res.params.value;
    Product.findOne(search)
        .then(product => res.json(product))
        .catch(err =>dataError(res,"Impossible de récupérer ce produit",err))
        .finally(() => next())
    ;
});

// Handle 404

expressApp.use((req,res, next) => {
    if (!req.route) {
        res.status(404)  ;
    }
    next();
});

expressApp.use((req, res) => {
    console.log("code réponse : " + res.statusCode);
    console.log("Requête terminée, réponse envoyé au client")
})

module.exports = expressApp;