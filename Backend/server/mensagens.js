const bodyParser = require("body-parser");
const express = require("express");
const Users = require("../data/users");
const scopes = require("../data/users/scopes");
const VerifyToken = require("../middleware/Token");
const cookieParser = require("cookie-parser");
const User = require("../data/users/users");
const Mensagens = require("../data/mensagens");
const Mensagem = require("../data/mensagens/mensagens");

const MensagensRouter = (io) => {
  let router = express();

  router.use(bodyParser.json({ limit: "100mb" }));
  router.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

  router.use(cookieParser());
  router.use(VerifyToken);

  router.route("").get(function (req, res, next) {
    const pageLimit = req.query.limit ? parseInt(req.query.limit) : 5;
    const pageSkip = req.query.skip ? pageLimit * parseInt(req.query.skip) : 0;

    req.pagination = {
      limit: pageLimit,
      skip: pageSkip,
    };

    Mensagens.findAll(req.pagination)
      .then((mensagens) => {
        const response = {
          auth: true,
          ...mensagens,
        };

        res.send(response);
        next();
      })
      .catch((err) => {
        console.log(err.message);
        next();
      });
  });

  router
    .route("/create")
    .post(Users.authorize([scopes.Gestor]), function (req, res, next) {
      let body = req.body;

      Mensagens.create(body)
        .then(() => {
          console.log("Mensagem criada com sucesso!");
          io.sockets.emit("gestor_notifications", {
            message: body._id,
            key: "mensagem",
          });
          res.status(200);
          res.send(body);
          next();
        })
        .catch((error) => {
          console.log("Error creating message: ", error);
          res.status(500);
        });
    });

  router
    .route("/:mensagemId")
    .delete(
      Users.authorize([scopes.Gestor, scopes.Vip, scopes.Normal]),
      async function (req, res, next) {
        let mensagemId = req.params.mensagemId;

        try {
          await Mensagem.findOne({
            _id: mensagemId,
          });
          Mensagens.removeById(mensagemId).then((result) => {
            res.status(200).json({
              mesage: "MENSAGEM SUCCESSFULLY DELETED",
              request: {
                type: "GET",
                description: "LISTA DE MENSAGENS",
                url: "http://localhost:5000/mensagens",
              },
            });
          });
        } catch (err) {
          res.status(500);
          res.send(err.message);
          console.log(err.message);
        }
      }
    );
  return router;
};
module.exports = MensagensRouter;
