const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./models/Todo.model");


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://amered12k:vQFPCUhdkjzZ74d7@cluster0.uv4n5.mongodb.net/todo?retryWrites=true&w=majority&appName=Cluster0"
);

app.post("/add", (req, res) => {
  const task = req.body.task;
  TodoModel.create({
    task: task,
  })
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
});

app.get("/get", (req, res) => {
  TodoModel.find()
    .then((result) => res.json(result))
    .catch((error) => console.log(error));
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndUpdate({ _id: id }, { done: true })
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete({ _id: id })
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
});
const port = process.env.PORT || 5000;
app.listen(port, (req, res) => {
  console.log(`listening to Port ${port}`);
});
