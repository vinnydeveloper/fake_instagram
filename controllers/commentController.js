const { Comment } = require("../models");

const commentController = {
  store: async (req, res) => {
    const { postId, description } = req.body;
    const { user } = req.session;

    const comment = await Comment.create({
      description,
      publications_id: postId,
      user_id: user.id,
      create_at: new Date(),
      update_at: new Date(),
    });

    if (comment) {
      return res.redirect(`/home#${postId}`);
    }
  },
};

module.exports = commentController;
