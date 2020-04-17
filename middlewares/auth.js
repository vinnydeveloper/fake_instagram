const auth = (req,res,next)=>{
    if(typeof( req.session.usuarioLogado) != 'undefined'){
        return next();
    }else{

        return res.send("<h1 style = 'background: rgba(235, 85, 85, 0.863)'>Você não logou, ou não tem uma sessão ativa - <a href ='/'>Voltar</a></h1>");
    }
}

module.exports = auth;