const { Publication, User } = require("./models");

async function verFeed() {
  const listaDePublications = await Publication.findAll({
    include: [
      {
        model: User,
        as: "user",
        required: true,
      },
      {
        mode,
      },
    ],
  });

  console.log(listaDePublications[0].user);
}

async function criarPublicacao() {
  const newPublication = await Publication.create({
    image: "link",
    like: 0,
    create_at: new Date(),
    update_at: new Date(),
    users_id: 1,
  });

  console.log(newPublication);
}

async function verPublicacoes(idUser) {
  const user = await User.findByPk(idUser, {
    include: {
      model: Publication,
    },
  });

  const publications = await Publication.findAll({
    where: {
      users_id: idUser,
    },
    include: {
      model: User,
      as: "user",
    },
  });

  console.log(publications);
}

verPublicacoes(1);
