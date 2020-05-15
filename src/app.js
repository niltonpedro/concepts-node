const express = require("express");
const { uuid } = require("uuidv4");
const cors = require("cors");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [
];

const likes = 0;

app.get("/repositories", (request, response) => {

response.json(repositories);

});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repositorie = { id: uuid(), title, url, techs, likes };

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

  const newRepositorie = {
    id: uuid(),
    title,
    url,
    techs,
    likes
  }

  repositories[repositorieIndex] = newRepositorie;

  return response.json(newRepositorie);

});

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
