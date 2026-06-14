import request from "supertest";
import app from "../src/app";

describe("Auth Login", () => {
  it("should login successfully", async () => {
    const email = `login${Date.now()}@gmail.com`;

    await request(app).post("/api/v1/auth/signup").send({
      name: "Login User",
      email,
      password: "Password123",
    });

    const response = await request(app).post("/api/v1/auth/login").send({
      email,
      password: "Password123",
    });

    expect(response.status).toBe(200);

    expect(response.body.success).toBe(true);

    expect(response.headers["set-cookie"]).toBeDefined();
  });
});
