const { Publication, User, Comment } = require("../models");
const moment = require("moment");

const postController = {
  index: async (_req, res) => {
    const publications = await Publication.findAll({
      include: [
        {
          model: User,
          required: true,
        },
        {
          model: Comment,
          required: false,
          include: {
            model: User,
          },
        },
      ],
    });

    return res.render("index", { publications, moment });
  },
  create: (_req, res) => res.render("post"),

  store: (req, res) => {
    const [post] = req.files;
    const { user } = req.session;
    const publication = Publication.create({
      image: post.filename,
      like: 0,
      users_id: user.id,
      create_at: new Date(),
      update_at: new Date(),
    });

    return res.redirect("/home");
  },

  like: async (req, res) => {
    const { id } = req.params;

    const publicationData = await Publication.findByPk(id);
    // publicationData.like = publicationData.like + 1;
    publicationData.like++;

    await publicationData.save();

    return res.redirect("/home");
  },
};

module.exports = postController;
