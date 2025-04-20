// General Stuff for ExpressJS
const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

let users = [];
console.log(users);

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(404).json({ error: "Name and Email are mandatory!" });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = users.findIndex((user) => user.id === id);
  // console.log(index)
  if (index === -1) {
    return res.status(404).json({ error: "User not found." });
  }

  const deletedUser = users.splice(index, 1);
  res.json({ message: "Deleted User.", user: deletedUser[0] });
});

// Starts the app.
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
