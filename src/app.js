const express = require("express");
const { uuid } = require("uuidv4");
const cors = require("cors");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [
];

const likesTotal = [

]

function pluLike (request, response, next) {
  likes +=1;
  return next();
}

app.get("/repositories", (request, response) => {

response.json(repositories);

});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repositorie = { id: uuid(), title, url, techs, likes: 0 };

  repositories.push(repositorie);

  return response.json(repositorie);

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositorieIndex = repositories.findIndex( project => project.id === id );

  if (repositorieIndex < 0 ) {
    return response.status(400).json({ error: "Repositorie not found"});
  }

  const repo = repositories[repositorieIndex];

  repo.title = title;
  repo.url = url;
  repo.techs = techs;

  return response.json(repo);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const findIndex = repositories.findIndex( repositorie => repositorie.id === id );

  if (findIndex < 0) {
    return response.status(400).json({ error: "Repositorie not found "});
  }

  repositories.splice(findIndex, 1)

  return response.status(204).send()

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const findIndex = repositories.findIndex( repositorie => repositorie.id === id );

  if (findIndex < 0) {
    return response.status(400).json({ error: "Repositorie not found "});
  }

  const repo = repositories[findIndex];

  repo.likes ++;

  return response.json(repo);


});

module.exports = app;
