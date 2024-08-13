const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  });
  response.json(users);
});

usersRouter.get("/:id", async (request, response) => {
  const user = await User.findById(request.params.id).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  });
  response.json(user);
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (!password) response.status(400).json({ error: "password is required" });
  else if (password?.length < 3)
    response
      .status(400)
      .json({ error: "password must contain at least 3 characters" });

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

usersRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const { name, blogs } = request.body;

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { name, blogs },
    { new: true, runValidators: true, context: "query" }
  );
  response.json(updatedUser);
});

module.exports = usersRouter;
