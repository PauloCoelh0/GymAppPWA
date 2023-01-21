let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let MensagensSchema = new Schema(
  {
    from: { type: String, default: "Gym Staff" },
    subject: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    text: { type: String, required: true },
  },
  { collection: "mensagens" }
);

let Mensagem = mongoose.model("Mensagem", MensagensSchema);

module.exports = Mensagem;
