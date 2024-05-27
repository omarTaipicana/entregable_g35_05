const request = require("supertest");
const app = require("../app");
const Actor = require("../models/Actor");
const Director = require("../models/Director");
const Genre = require("../models/Genre");

let id;

test("GET/movies debe traer todas las películas", async () => {
  const res = await request(app).get("/movies");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST/movies debe crear una película", async () => {
  const newMovie = {
    name: "Encrucijada",
    image: "www.encrucijada.image",
    synopsis: "pelicula sobre la vida de Robert Jhonson",
    releaseYear: 1985,
  };
  const res = await request(app).post("/movies").send(newMovie);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(id).toBeDefined();
  expect(res.body.name).toBe(newMovie.name);
});

test("GET/movies/:id debe traer una película segun su id", async () => {
  const res = await request(app).get(`/movies/${id}`);
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Object);
});

test("PUT/movies/:id debe actualizar una película", async () => {
  const updateMovie = {
    name: "Encrucijada updated",
  };
  const res = await request(app).put(`/movies/${id}`).send(updateMovie);
  expect(res.status).toBe(200);
  expect(id).toBeDefined();
  expect(res.body.name).toBe(updateMovie.name);
});

test("POST/movies/:id/actors debe insertar un actor de una película", async () => {
  actorMovie = await Actor.create({
    firstName: "Jhony",
    lastName: "Deep",
    nationality: "EEUU",
    image:
      "https://phantom-marca.unidadeditorial.es/18388c618e6992e7586ccab4718bbd99/resize/828/f/jpg/assets/multimedia/imagenes/2023/05/13/16839797234679.jpg",
    birthday: "1963-05-16",
  });
  const res = await request(app)
    .post(`/movies/${id}/actors`)
    .send([actorMovie.id]);
  await actorMovie.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
  expect(res.body.length).toBe(1);
});

test("POST/movies/:id/directors debe insertar un director de una película", async () => {
  directorMovie = await Director.create({
    firstName: "Gore",
    lastName: "Verbinski",
    nationality: "EEUU",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Gore_Verbinski_1.JPG/260px-Gore_Verbinski_1.JPG",
    birthday: "1964-03-16",
  });
  const res = await request(app)
    .post(`/movies/${id}/directors`)
    .send([directorMovie.id]);
  await directorMovie.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
  expect(res.body.length).toBe(1);
});

test("POST/movies/:id/genres debe insertar un genero de una película", async () => {
  genreMovie = await Genre.create({
    name: "Comedia",
  });
  const res = await request(app)
    .post(`/movies/${id}/genres`)
    .send([genreMovie.id]);
  await genreMovie.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
  expect(res.body.length).toBe(1);
});

test("DELETE/movies/:id debe eliminar una película", async () => {
  const res = await request(app).delete(`/movies/${id}`);
  expect(res.status).toBe(204);
});
