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
  email: {
    type: String,
    required: true,
    unique: true,
    match:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: { type: String, required: true },
  role: {
    type: RoleSchema,
    required: true,
    default: { name: "normal", scope: ["normal"] },
  },
  age: { type: Number },
  address: { type: String, required: true },
  country: { type: String, required: true },
  vipState: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected", "Normal"],
    default: "Normal",
  },
  picture: { type: String, required: true },
});

let User = mongoose.model("User", UserSchema);

module.exports = User;
