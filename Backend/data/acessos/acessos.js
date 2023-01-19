let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let AcessoSchema = new Schema({
  user: { type: String },
  entryHour: { type: Date, required: true, default: Date.now() },
  exitHour: { type: Date, required: false },
  isIn: { type: Boolean, required: true, default: true },
  local: { type: String, required: true },
});

let Acesso = mongoose.model("Acesso", AcessoSchema);

module.exports = Acesso;
