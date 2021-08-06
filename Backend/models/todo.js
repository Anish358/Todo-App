const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  task: { type: String, required: true },
  time: {
    type: Number,
    default: Date.now,
  },
});

const model = mongoose.model("TodoModel", TodoSchema);

module.exports = model;
