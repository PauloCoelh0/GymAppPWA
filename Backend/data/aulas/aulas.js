let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let AulaSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  room: { type: Number, required: true },
  beginDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  image: { type: String, required: false },
  capacity: { type: Number, required: true },
  participants: { type: Number, default: 0, required: false },
  registrations: [{ type: String }],
  aulaImage: { type: String, required: true },
});

let Aula = mongoose.model("Aula", AulaSchema);

module.exports = Aula;
