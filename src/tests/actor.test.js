const request = require("supertest");
const app = require("../app");

let id;

test("GET/actors debe traer todos los actores", async () => {
  const res = await request(app).get("/actors");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST/actors debe crear un actor", async () => {
  const newActor = {
    firstName: "Jhony",
    lastName: "Deep",
    nationality: "EEUU",
    image:
      "https://phantom-marca.unidadeditorial.es/18388c618e6992e7586ccab4718bbd99/resize/828/f/jpg/assets/multimedia/imagenes/2023/05/13/16839797234679.jpg",
    birthday: "1963-05-16",
  };
  const res = await request(app).post("/actors").send(newActor);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(id).toBeDefined();
  expect(res.body.name).toBe(newActor.name);
});

test("GET/actors/:id debe traer un actor segun su id", async () => {
  const res = await request(app).get(`/actors/${id}`);
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Object);
});

test("PUT/actors/:id debe actualizar un actor", async () => {
  const updateActor = {
    firstName: "Jhony updated",
  };
  const res = await request(app).put(`/actors/${id}`).send(updateActor);
  expect(res.status).toBe(200);
  expect(id).toBeDefined();
  expect(res.body.name).toBe(updateActor.name);
});

test("DELETE/actors/:id debe eliminar un actor", async () => {
  const res = await request(app).delete(`/actors/${id}`);
  expect(res.status).toBe(204);
});
