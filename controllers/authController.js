const Sequelize = require("sequelize");
const config = require("../configs/database");
const bcrypt = require("bcrypt");

const authController = {
  create: (_req, res) => {
    return res.render("auth/login");
  },
  store: async (req, res) => {
    const { email, password } = req.body;
    const con = new Sequelize(config);

    const [user] = await con.query(
      "select * from users where email=:email limit 1",
      {
        replacements: {
          email,
        },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.render("auth/login", {
        msg: "Email ou senha errados!",
      });
    }

    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return res.redirect("/home");
  },

  destroy: (req, res) => {
    req.session = undefined;
    return res.redirect("/login");
  },
};

module.exports = authController;
