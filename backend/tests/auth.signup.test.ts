import request from "supertest";
import app from "../src/app";

describe("Auth Signup", () => {
  it("should create a new user", async () => {
    const response = await request(app)
      .post("/api/v1/auth/signup")
      .send({
        name: "Test User",
        email: `signup${Date.now()}@gmail.com`,
        password: "Password123",
      });

    expect(response.status).toBe(201);

    expect(response.body.success).toBe(true);

    expect(response.body.data.email).toContain("@gmail.com");
  });
});
