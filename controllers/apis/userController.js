const { User } = require("../../models");
const bcrypt = require("bcrypt");
const usercontroller = {
  index: async (req, res) => {
    try {
      const users = await User.findAll();
      return res.status(200).json(users);
    } catch (e) {
      console.error(e);
      return res.status(400).json({
        error: true,
        msg: "Erro na requisição tente novamente!",
      });
    }
  },

  show: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      return res.status(200).json(user);
    } catch (e) {
      console.error(e);
      return res.status(400).json({
        error: true,
        msg: "Erro na requisição tente novamente!",
      });
    }
  },

  store: async (req, res) => {
    const { name, username, email, password } = req.body;
    try {
      const newUser = await User.create({
        name,
        email,
        username,
        password: bcrypt.hashSync(password, 10),
      });

      return res.status(201).json(newUser);
    } catch (e) {
      console.log(e);
      if (e.name === "SequelizeConnectionRefusedError") {
        return res.status(500).json({
          error: true,
          msg: "Sem conexão com o banco de dados, tente novamente!",
        });
      }
      if (e.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json(e.parent.sqlMessage);
      }
      return res.status(400).json({
        error: true,
        msg: "Erro na requisição tente novamente!",
      });
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { name, username, email, password } = req.body;
    try {
      const user = await User.update(
        { name, username, email, password: bcrypt.hashSync(password, 10) },
        {
          where: {
            id,
          },
          returning: true,
          plain: true,
        }
      );
      const updatedUser = await User.findByPk(id);
      return res.status(200).json(updatedUser);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        error: true,
        msg: "Erro na requisição tente novamente!",
      });
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.destroy({
        where: {
          id,
        },
      });
      return res.sendStatus(204);
    } catch (e) {
      console.error(e);
      if (e.name === "SequelizeForeignKeyConstraintError") {
        return res.status(400).json({
          error: true,
          msg: "Esse usuario contem posts, não pode ser excluido",
        });
      }
      return res.status(400).json({
        error: true,
        msg: "Erro na requisição tente novamente!",
      });
    }
  },
};

module.exports = usercontroller;
