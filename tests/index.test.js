const request = require("supertest");
const app = require("../index");

describe("Express.js Server", () => {
  it("GET / should return Hello message", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain("Hello from Express.js");
  });

  it("GET /health should return status OK", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });

  it("GET /api/info should return app info as JSON", async () => {
    const res = await request(app).get("/api/info");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("version");
  });

  it("GET /random should return 404 for unknown routes", async () => {
    const res = await request(app).get("/random");
    expect(res.statusCode).toBe(404);
    expect(res.text).toContain("Not Found");
  });
});
describe("POST /login", () => {
  it("should return 200 OK with correct credentials", async () => {
    const response = await request(app)
      .post("/login")
      .send({
        username: "admin",
        password: "password123",
      })
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toEqual({
      message: "OK",
      success: true,
    });
  });

  it("should return 401 Unauthorized with wrong password", async () => {
    const response = await request(app)
      .post("/login")
      .send({
        username: "admin",
        password: "wrongpassword",
      })
      .expect("Content-Type", /json/)
      .expect(401);

    expect(response.body).toEqual({
      message: "Unauthorized",
      success: false,
    });
  });

  it("should return 401 Unauthorized with wrong username", async () => {
    const response = await request(app)
      .post("/login")
      .send({
        username: "wronguser",
        password: "password123",
      })
      .expect("Content-Type", /json/)
      .expect(401);

    expect(response.body).toEqual({
      message: "Unauthorized",
      success: false,
    });
  });

  it("should return 401 Unauthorized with both wrong credentials", async () => {
    const response = await request(app)
      .post("/login")
      .send({
        username: "wronguser",
        password: "wrongpassword",
      })
      .expect("Content-Type", /json/)
      .expect(401);

    expect(response.body).toEqual({
      message: "Unauthorized",
      success: false,
    });
  });

  it("should return 401 Unauthorized when username is missing", async () => {
    const response = await request(app)
      .post("/login")
      .send({
        password: "password123",
      })
      .expect("Content-Type", /json/)
      .expect(401);

    expect(response.body).toEqual({
      message: "Unauthorized",
      success: false,
    });
  });

  it("should return 401 Unauthorized when password is missing", async () => {
    const response = await request(app)
      .post("/login")
      .send({
        username: "admin",
      })
      .expect("Content-Type", /json/)
      .expect(401);

    expect(response.body).toEqual({
      message: "Unauthorized",
      success: false,
    });
  });

  it("should return 401 Unauthorized with empty request body", async () => {
    const response = await request(app)
      .post("/login")
      .send({})
      .expect("Content-Type", /json/)
      .expect(401);

    expect(response.body).toEqual({
      message: "Unauthorized",
      success: false,
    });
  });

  it("should handle malformed JSON gracefully", async () => {
    const response = await request(app)
      .post("/login")
      .set("Content-Type", "application/json")
      .send('{"username": "admin", "password": "password123"')
      .expect(400);
  });
});
