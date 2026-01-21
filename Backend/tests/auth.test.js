
/**
 * Basic integration tests for auth endpoints.
 * Ensure Backend/server.js exports "app" (module.exports = app).
 */

const request = require("supertest");
const mongoose = require("mongoose");

let app;
try {
  app = require("../server");
} catch (err) {
  throw new Error("Could not require ../server. Ensure server.js exports the Express app (module.exports = app).");
}

describe("Auth endpoints", () => {
  beforeAll(async () => {
    jest.setTimeout(15000);
  });

  afterAll(async () => {
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
    }
  });

  it("registers and logs in a user", async () => {
    const user = {
      name: "Test User",
      email: `test+${Date.now()}@example.com`,
      password: "TestPass123!"
    };

    const reg = await request(app).post("/api/auth/register").send(user);
    expect(reg.body).toHaveProperty("success", true);

    const login = await request(app).post("/api/auth/login").send({ email: user.email, password: user.password });
    expect(login.body).toHaveProperty("success", true);
    expect(login.body).toHaveProperty("token");
  });
});

