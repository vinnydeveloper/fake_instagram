var express = require('express');
var router = express.Router();
const usuarioController = require("../controllers/usuarioController")
const auth = require('../middlewares/auth')

/* GET home page. */


router.get('/', usuarioController.loginView);
router.post('/', usuarioController.logar);

router.get('/registro', usuarioController.registerView);
router.post('/registro', usuarioController.cadastroUsuario);


router.get('/home',auth, function(req, res, next) {
  res.render('index', { msg:"",user: req.session.usuarioLogado });
});

module.exports = router;
