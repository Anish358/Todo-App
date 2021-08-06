// Requirements
const express = require("express");
const mongoose = require("mongoose");
const Todo = require("./models/todo");
const bodyParser = require("body-parser");
const cors = require("cors");

// App Initializzation
const app = express();
const PORT = 5000 || process.env.PORT;

// Moongoose Connection
mongoose.connect(
  "mongodb+srv://anish:ani33ash@cluster0.1fga8.mongodb.net/todo-app?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);
// Connection Check
let conn = mongoose.connection;
conn.on("connected", function () {
  console.log("database is connected successfully");
});

// body parser
app.use(bodyParser.json());

// cross origin allow
app.use(cors());

// Routes

// Fetch Tasks
app.get("/api/get", async (req, res) => {
  const tasks = await Todo.find({});
  res.json(tasks);
});

// Create tasks
app.post("/api/create", async (req, res) => {
  const newtask = req.body;
  const response = await Todo.create(newtask);
  res.json({ status: "Task Created" });
});

// Update tasks
app.post("/api/modify", async (req, res) => {
  const obj = req.body;
  const response = await Todo.updateOne(
    {
      task: obj.old,
    },
    {
      task: obj.new,
    }
  );
  res.json({ status: "Task Updated" });
});

// delete tasks
app.post("/api/delete", async (req, res) => {
  const { task } = req.body;
  const response = await Todo.deleteOne({ task });
  res.json({ status: "Task Deleted" });
});

// Listen to the server
app.listen(PORT, () => console.log(`Listining on port ${PORT}`));
