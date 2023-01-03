let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let AcessoSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  entryHour: { type: String, required: true },
  exitHour: { type: String, required: true },
  isIn: { type: Boolean, required: false, default: true },
  local: { type: String, required: true },
});

let Acesso = mongoose.model("Acesso", AcessoSchema);

module.exports = Acesso;
