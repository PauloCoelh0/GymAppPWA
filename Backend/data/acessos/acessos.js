let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let AcessoSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  date: { type: Date, required: true },
  entryHour: { type: Date, required: true, default: Date.now() },
  exitHour: { type: Date, required: false },
  isIn: { type: Boolean, required: false, default: true },
  local: { type: String, required: true },
});

let Acesso = mongoose.model("Acesso", AcessoSchema);

module.exports = Acesso;
