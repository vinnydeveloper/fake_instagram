var express = require('express');
var router = express.Router();
const usuarioController = require("../controllers/usuarioController")

/* GET home page. */


router.get('/', usuarioController.login);


router.get('/registro', usuarioController.register);

router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
