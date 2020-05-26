const Sequelize = require("sequelize");
const config = require("../configs/database");
const bcrypt = require("bcrypt");

const userController = {
  create: (_req, res) => res.render("auth/register"),

  store: async (req, res) => {
    const { name, username, email, password } = req.body;
    const con = new Sequelize(config);
    const hashPassword = bcrypt.hashSync(password, 10);

    const user = await con.query(
      "INSERT INTO users (name, username, email , password, create_at, update_at) values (:name, :username, :email, :password, :create_at, :update_at)",
      {
        replacements: {
          name,
          username,
          email,
          password: hashPassword,
          create_at: new Date(),
          update_at: new Date(),
        },
        type: Sequelize.QueryTypes.INSERT,
      }
    );
    if (!user) {
      return res.render("auth/register", {
        msg: "Erro ao cadastrar um usuario",
      });
    }

    return res.redirect("/home");
  },
};

module.exports = userController;
