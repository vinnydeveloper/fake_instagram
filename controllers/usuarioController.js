const sequelize = require('sequelize');
const dbConfig = require('../config/database');
const bcrypt = require('bcrypt');
const connection = new sequelize(dbConfig);

const usuarioController= {
    loginView : (req, res) => {

        res.render('auth/login', { msg: '' })
    },
    logar: async (req,res)=>{
        const {email,senha} = req.body
        const resultado = await connection.query('SELECT * FROM users WHERE email = :email',{
            replacements:{email},
            type:sequelize.QueryTypes.SELECT
            });

            if(resultado[0].email == undefined || resultado[0].email != email  ){

                return  res.render('auth/login', { msg: 'Usuaário ou senha invalidos' })
            }

            if(resultado[0].password == undefined || !bcrypt.compareSync(senha,resultado[0].password)){

                return  res.render('auth/login', { msg: 'Usuaário ou senha invalidos' })
            }

            req.session.usuarioLogado = resultado[0].username;
         
           res.redirect('/home')      
            

    },

    registerView: (req,res) => {
        res.render('auth/register', {title:'Express',msg:""})
    },
    cadastroUsuario:(req,res) =>{
        
            const {email,nome,usuario,senha} = req.body;
            const senhaCriptografada = bcrypt.hashSync(senha,10);
                connection.query("INSERT INTO users (name, email, username, password) VALUES (:nome,:email,:usuario,:senhaCriptografada);",{
                replacements: {nome,email,usuario,senhaCriptografada},
                type: sequelize.QueryTypes.INSERT
            }).then((dado)=>{console.log('inserido com sucesso');
                
                    res.render('auth/login');
    
            })
       
            
        
      
    }
    

}

module.exports = usuarioController;