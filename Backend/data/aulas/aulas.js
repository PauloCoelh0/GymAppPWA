let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let AulaSchema = new Schema({
  name: { type: String, required: true },
  room: { type: Number, required: true },
  beginDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  capacity: { type: Number, required: true },
  participants: { type: Number, default: 0, required: false },
  registrations: [{ type: String }],
  aulaImage: { type: String, required: false },
});

let Aula = mongoose.model("Aula", AulaSchema);

module.exports = Aula;
