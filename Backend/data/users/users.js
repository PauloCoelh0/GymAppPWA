let mongoose = require("mongoose");
let scopes = require("./scopes");

let Schema = mongoose.Schema;

let RoleSchema = new Schema({
  name: { type: String, required: true },
  scope: [
    {
      type: String,
      enum: [scopes.Gestor, scopes.Normal, scopes.Vip],
    },
  ],
});

let UserSchema = new Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: RoleSchema, required: true},
  age: { type: Number },
  address: { type: String, required: true },
  country: { type: String, required: true },
  member: { type: Boolean, default: false },
  // photo: { type: Boolean, default: false },  Adicionar fotografia do utilizador
});

let User = mongoose.model("User", UserSchema);

module.exports = User;
