const request = require("supertest");
const app = require("../app");

let id;

test("GET/directors debe traer todos los directores", async () => {
  const res = await request(app).get("/directors");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST/directors debe crear un director", async () => {
  const newDirector = {
    firstName: "Gore",
    lastName: "Verbinski",
    nationality: "EEUU",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Gore_Verbinski_1.JPG/260px-Gore_Verbinski_1.JPG",
    birthday: "1964-03-16",
  };
  const res = await request(app).post("/directors").send(newDirector);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(id).toBeDefined();
  expect(res.body.name).toBe(newDirector.name);
});

test("GET/directors/:id debe traer un director segun su id", async () => {
  const res = await request(app).get(`/directors/${id}`);
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Object);
});

test("PUT/directors/:id debe actualizar un director", async () => {
  const updateDirector = {
    firstName: "Gore updated",
  };
  const res = await request(app).put(`/directors/${id}`).send(updateDirector);
  expect(res.status).toBe(200);
  expect(id).toBeDefined();
  expect(res.body.name).toBe(updateDirector.name);
});

test("DELETE/directors/:id debe eliminar un director", async () => {
  const res = await request(app).delete(`/directors/${id}`);
  expect(res.status).toBe(204);
});
