const { User } = require("../../models");

module.exports = {
  index: async (req, res) => {
    try {
      const users = await User.findAll();
      return res.status(200).json(users);
    } catch (error) {
      if (error.name === "SequelizeConnectionRefusedError") {
        return res.status(400).json({
          erro: true,
          msg: "Erro ao se conectar no banco, entre em contato",
        });
      }
    }
  },

  store: async (req, res) => {
    try {
      const { name, username, email, password } = req.body;
      const user = await User.create(req.body);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
};
