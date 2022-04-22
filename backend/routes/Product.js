const Product = require("../model/Product");

// ajout de produits

expressApp.post('/product/add', (req, res, next)=>{
    const product = new Product({...req.body});
    product.save()
        .then(() => {
            res.status(201);
            res.json({message: "ok"});
        })
        .catch(err=> {
            res.status(400);
            res.json({error: "Impossible d'enregistrer le produit"});
        })
        .finally(() => next())
    ;
});