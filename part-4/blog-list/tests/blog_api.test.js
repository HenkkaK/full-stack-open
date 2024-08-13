const { test, after, beforeEach, describe, before } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const bcrypt = require("bcrypt");
const Blog = require("../models/blog");
const User = require("../models/user");
const helper = require("./test_helper");

let TOKEN = "";

before(async () => {
  const passwordHash = await bcrypt.hash("secret", 10);
  const user = new User({
    username: "test-runner",
    name: "node:test runner",
    passwordHash,
  });

  await user.save();
  const response = await api
    .post("/api/login")
    .send({ username: "test-runner", password: "secret" });
  TOKEN = response.body.token;

  await Promise.all(
    helper.blogs.map(async (blog) => {
      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(blog);
    })
  );
});

describe("api GET tests", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${TOKEN}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("unique identifier property of blog posts is 'id'", async () => {
    const response = await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${TOKEN}`);
    const idKeys = response.body.flatMap((e) =>
      Object.keys(e).filter((key) => key === "id")
    );
    assert.deepStrictEqual(idKeys, new Array(response.body.length).fill("id"));
  });
});

describe("api POST tests", () => {
  test("POST Request correctly creates a new blog to database", async () => {
    const response = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${TOKEN}`)
      .send(helper.singleBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const { title, author, url, likes } = response.body;
    assert.deepStrictEqual(helper.singleBlog, { title, author, url, likes });
  });

  test("if post likes are undefined, it is defaulted to 0", async () => {
    const response = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${TOKEN}`)
      .send(helper.singleBlogNoLikes)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    assert.strictEqual(0, response.body.likes);
  });

  test("if title is undefined server responds with '400 Bad Request'", async () => {
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${TOKEN}`)
      .send(helper.singleBlogNoTitle)
      .expect(400);
  });

  test("if url is undefined server responds with '400 Bad Request'", async () => {
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${TOKEN}`)
      .send(helper.singleBlogNoUrl)
      .expect(400);
  });

  test("if no token is given, server responds with '401 Unauthorized'", async () => {
    await api.post("/api/blogs").send(helper.singleBlogNoUrl).expect(401);
  });
});

describe("api DELETE tests", () => {
  test("server responds with 204 if deletion is successful", async () => {
    const blogs = await helper.blogsInDb();
    const id = blogs[0].id;
    await api
      .delete(`/api/blogs/${id}`)
      .set("Authorization", `Bearer ${TOKEN}`)
      .expect(204);
  });
  test("server responds with 404 if ID is invalid", async () => {
    await api
      .delete("/api/blogs/#INVALID_ID")
      .set("Authorization", `Bearer ${TOKEN}`)
      .expect(404);
  });
});

describe("api PUT tests", () => {
  test("if successful, the server sends the updated blog as response", async () => {
    const blogs = await helper.blogsInDb();
    const { title, author, url, id } = blogs[0];
    const blog = { title, author, url, likes: 20 };
    const response = await api
      .put(`/api/blogs/${id}`)
      .set("Authorization", `Bearer ${TOKEN}`)
      .send(blog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(20, response.body.likes);
  });
  test("server responds with 404 if ID is invalid", async () => {
    await api
      .put("/api/blogs/#INVALID_ID")
      .set("Authorization", `Bearer ${TOKEN}`)
      .expect(404);
  });
});

after(async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});
  await mongoose.connection.close();
});
