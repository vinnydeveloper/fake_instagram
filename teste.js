const { Publication } = require("./models");

async function verFeed() {
  const listaDePublications = await Publication.findAll();

  console.log(listaDePublications);
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

criarPublicacao();
