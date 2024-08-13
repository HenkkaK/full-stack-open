const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { name: 1 });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate("user", {
    name: 1,
  });
  response.json(blog);
});

blogsRouter.post("/", async (request, response) => {
  const { title, author, url, likes } = request.body;

  const user = request.user;

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes ?? 0,
    user: user.id,
  });
  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const user = request.user;

  const id = request.params.id;
  const blog = await Blog.findById(id);
  if (!blog)
    return response.status(400).json({ error: `No blog found for id: ${id}` });
  if (blog.user.toString() !== user.id)
    return response
      .status(401)
      .json({ error: "user has invalid rights to the blog" });

  await Blog.findByIdAndDelete(id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const { title, author, url, likes, user } = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { title, author, url, likes, user },
    { new: true, runValidators: true, context: "query" }
  );
  response.json(updatedBlog);
});

module.exports = blogsRouter;
