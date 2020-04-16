
const usuarioController= {
    login : (req, res) => {

        // res.send("deu certo")
       
        res.render('auth/login', { title: 'Express' })
    },
    register: (req,res) => {

        res.render('auth/register', { title: 'Express' })
    
}

}

module.exports = usuarioController;