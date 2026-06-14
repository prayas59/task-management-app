import request from "supertest";
import app from "../src/app";

describe("Task Creation", () => {
  it("should create a task for authenticated user", async () => {
    const email = `task${Date.now()}@gmail.com`;

    await request(app).post("/api/v1/auth/signup").send({
      name: "Task User",
      email,
      password: "Password123",
    });

    const loginResponse = await request(app).post("/api/v1/auth/login").send({
      email,
      password: "Password123",
    });

    const cookie = loginResponse.headers["set-cookie"];

    const response = await request(app)
      .post("/api/v1/tasks")
      .set("Cookie", cookie)
      .send({
        title: "Complete Assessment",
        description: "Backend Testing",
        priority: "HIGH",
      });

    expect(response.status).toBe(201);

    expect(response.body.success).toBe(true);

    expect(response.body.data.title).toBe("Complete Assessment");
  });
});
