const sequelize = require('sequelize');
const dbConfig = require('../config/database');
const connection = new sequelize(dbConfig);

const usuarioController= {
    login : (req, res) => {

             
        res.render('auth/login', { title: 'Express' })
    },
    register: (req,res) => {

        res.render('auth/register', {title:'Express'})
    
}

}

module.exports = usuarioController;