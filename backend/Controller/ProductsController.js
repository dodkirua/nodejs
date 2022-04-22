/**
 * Handle 'product related treatment
 */
class ProductsController {
    /**
     * Return the products list
     */
    static getProducts = (req, res, next, sequelize) => {
        sequelize.query('SELECT * FROM product')
            .then(([products, metadata]) => res.json(products))
            .catch(err =>{
                res.json({error: "Impossible de récupérer les produits"})
                console.error(`Une erreur est survenue en récupérant les produits : ${err}`)
            })
            .finally( () => {
                next();
            })
    };

    static addProduct = (req, res, next, sequelize) => {
        const body = req.body;
        if('name' in body && 'description' in body && 'quantity' in body) {
           sequelize.query(`
            INSERT INTO product
                (name ,description, quantity)
            VALUES
                ("${body.name}, ${body.description}, ${body.quantity}")
           `)

               .then(() => res.json({
                   message: 'ok'
               }))
               .catch(err => res.json({
                   error: `impossible d'ajouter le produit: ${err}`
               }))

               .finally(() => next())
            ;
        }
        else {
            res.status(404);
            res.json({
               error:'Missing parameter'
            });
        }

        next();
    };
}

module.exports = ProductsController;