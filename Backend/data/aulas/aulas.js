let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let AulaSchema = new Schema({
  name: { type: String, required: true },
  beginDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  image: { type: String, required: false },
  capacity: { type: Number, required: true },
  participants: { type: Number, default: 0, required: false },
  
});

let Aula = mongoose.model("Aula", AulaSchema);

module.exports = Aula;
