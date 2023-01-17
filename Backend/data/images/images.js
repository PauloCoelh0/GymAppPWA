const mongoose = require("mongoose");

const ImageSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  aula: { type: mongoose.Schema.Types.ObjectId, ref: "Aula", required: true }, //Connect this schema with the Car Schema
  aulaImage: { type: String, required: true },
});

let Image = mongoose.model("Image", ImageSchema);

module.exports = Image;
