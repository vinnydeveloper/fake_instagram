const { Publication, User, Comment } = require("../models");
const moment = require("moment");
const userController = {
  index: async (req, res) => {
    const { user } = req.session;

    const publications = await Publication.findAll({
      include: [
        {
          model: User,
          as: "user",
          required: true,
        },
        {
          model: Comment,
          as: "comments",
          include: {
            model: User,
            as: "user",
          },
        },
      ],
    });

    console.log(publications[0].comments[0]);

    return res.render("index", { publications, moment });
  },
  create: (_req, res) => res.render("post"),

  store: async (req, res) => {
    const [photo] = req.files;
    const { user } = req.session;

    const newPost = Publication.create({
      image: `/posts/${photo.filename}`,
      like: 0,
      users_id: user.id,
      create_at: new Date(),
      update_at: new Date(),
    });

    return res.redirect("/home");
  },
};

module.exports = userController;
