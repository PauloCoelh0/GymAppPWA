const express = require('express');
let AuthAPI = require("./server/auth");
let UsersAPI = require("./server/users");
let AulasAPI = require("./server/aulas");

function init(io) {
  let api = express();

    api.use("/auth", AuthAPI());
    api.use("/users", UsersAPI(io));
    api.use("/aulas", AulasAPI(io));
    
  return api;
}

module.exports = {
    init: init,
}