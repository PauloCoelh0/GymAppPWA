const bodyParser = require("body-parser");
const express = require("express");
const Acessos = require("../data/acessos");
const Users = require("../data/users");
const scopes = require("../data/users/scopes");
const VerifyToken = require("../middleware/Token");
const cookieParser = require("cookie-parser");

const AcessosRouter = (io) => {
  let router = express();

  router.use(bodyParser.json({ limit: "100mb" }));
  router.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

  router.use(cookieParser());
  router.use(VerifyToken);

  router
    .route("")
    .get(
      Users.autorize([scopes.Gestor, scopes.Normal, scopes.Vip]),
      function (req, res, next) {
        const pageLimit = req.query.limit ? parseInt(req.query.limit) : 5;
        const pageSkip = req.query.skip
          ? pageLimit * parseInt(req.query.skip)
          : 0;

        req.pagination = {
          limit: pageLimit,
          skip: pageSkip,
        };

        Acessos.findAll(req.pagination)
          .then((acessos) => {
            const response = {
              auth: true,
              ...acessos,
            };

            res.send(response);
            next();
          })
          .catch((err) => {
            console.log(err.message);
            next();
          });
      }
    );

  router
    .route("/create")
    .post(Users.autorize([scopes.Gestor]), function (req, res, next) {
      let body = req.body;

      Acessos.create(body)
        .then(() => {
          console.log("Acesso criada com sucesso!");
          io.sockets.emit("gestor_notifications", {
            message: "Add new acesso",
            key: "Acesso",
          });
          res.status(200);
          res.send(body);
          next();
        })
        .catch((err) => {
          console.log("Ocorreu um erro ao adicionar a acesso!");
          console.log(err.message);
          err.status = err.status || 500;
          res.status(401);
          next();
        });
    });

  router
    .route("/:acessoId")
    .get(
      Users.autorize([scopes.Gestor, scopes.Vip]),
      function (req, res, next) {
        console.log("get acesso by id");
        let acessoId = req.params.acessoId;
        Acessos.findAcessoById(acessoId)
          .then((acesso) => {
            res.status(200);
            res.send(acesso);
            next();
          })
          .catch((err) => {
            res.status(404);
            next();
          });
      }
    )
    .put(Users.autorize([scopes.Gestor]), function (req, res, next) {
      console.log("Update acesso by id");
      let acessoId = req.params.acessoId;
      let body = req.body;

      Acessos.update(acessoId, body)
        .then((acesso) => {
          res.status(200);
          res.send(acesso);
          next();
        })
        .catch((err) => {
          res.status(404);
          next();
        });
    })
    .delete(Users.autorize([scopes.Gestor]), function (req, res, next) {
      const id = req.params.acessoId;
      Acessos.removeById(id)
        .then((result) => {
          res.status(200).json({
            mesage: "CLASS SUCCESSFULLY DELETED",
            request: {
              type: "GET",
              description: "LISTA DE ACESSOS",
              url: "http://localhost:5000/acessos",
            },
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            error: err,
          });
        });
    });

  return router;
};

module.exports = AcessosRouter;
