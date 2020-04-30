const { Publication } = require("../models");
const userController = {
  create: (_req, res) => res.render("post"),

  store: async (req, res) => {
    const [photo] = req.files;
    const { user } = req.session;

    const newPost = Publication.create({
      image: `/posts/${photo.originalname}`,
      like: 0,
      users_id: user.id,
      create_at: new Date(),
      update_at: new Date(),
    });

    return res.redirect("/home");
  },
};

module.exports = userController;
