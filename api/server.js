const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const uri = process.env.ATLAS_URI;
mongoose
   .connect(uri, { useNewUrlParser: true })
   .then(() => console.log("Connected to MongoDB"))
   .catch(console.error);

// Importing the Schema
const Todo = require("./models/todo.model");

// App Functionailty
app.get("/todos", async (req, res) => {
   const todos = await Todo.find();
   res.json(todos);
});

app.post("/todo/new", (req, res) => {
   const todo = new Todo({
      text: req.body.text,
   });
   todo.save();
   res.json(todo);
});

app.delete("/todo/delete/:id", async (req, res) => {
   const result = await Todo.findByIdAndDelete(req.params.id);
   res.json({ result });
});

// app.get("/todo/complete/:id", async (req, res) => {
//    const todo = await Todo.findById(req.params.id);
//    todo.complete = !todo.complete;
//    todo.save();
//    res.json(todo);
// });

app.put("/todo/update/:id", async (req, res) => {
   const todo = await Todo.findById(req.params.id);
   todo.text = req.body.text;
   todo.save();
   res.json(todo);
});

// Start Listening for the server
app.listen(port, () => {
   console.log(`Server is running on port: ${port}...`);
});
