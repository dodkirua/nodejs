const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('nodejs_database', 'dev', 'dev', {
    dialect: 'mysql',
    host: 'localhost'
});

sequelize.authenticate()
    .catch(err => {
        console.error(err);
        process.exit(1);
    })
;


module.exports = sequelize;