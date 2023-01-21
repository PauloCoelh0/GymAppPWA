const Mensagens = require("./mensagens");
const MensagensService = require("./service");

const service = MensagensService(Mensagens);

module.exports = service;
