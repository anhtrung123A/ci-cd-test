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
