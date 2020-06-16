const { Comment } = require("../models");

const commentController = {
  store: async (req, res) => {
    const { idPost } = req.params;
    const { idPost: idPostBody, description } = req.body;
    const { user } = req.session;

    const newComment = await Comment.create({
      description,
      user_id: user.id,
      publications_id: idPost,
      create_at: new Date(),
      update_at: new Date(),
    });

    if (!newComment) {
      console.log("Erro ao comentar");
    }

    return res.redirect("/home");
  },
};

module.exports = commentController;
