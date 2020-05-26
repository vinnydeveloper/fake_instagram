const { Comment } = require("../models");

const commentController = {
  store: async (req, res) => {
<<<<<<< HEAD
    const { idPost } = req.params;
    const { idPost: idPostBody, description } = req.body;
    const { user } = req.session;

    const newComment = await Comment.create({
      description,
      user_id: user.id,
      publications_id: idPost,
=======
    const { postId, description } = req.body;
    const { user } = req.session;

    const comment = await Comment.create({
      description,
      publications_id: postId,
      user_id: user.id,
>>>>>>> 6745c4f52d9ebc9007b9c7b8454885b13ca464f6
      create_at: new Date(),
      update_at: new Date(),
    });

<<<<<<< HEAD
    if (!newComment) {
      console.log("Erro ao comentar");
    }

    return res.redirect("/home");
=======
    if (comment) {
      return res.redirect(`/home#${postId}`);
    }
>>>>>>> 6745c4f52d9ebc9007b9c7b8454885b13ca464f6
  },
};

module.exports = commentController;
