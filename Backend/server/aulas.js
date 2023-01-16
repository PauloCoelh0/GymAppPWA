const bodyParser = require("body-parser");
const express = require("express");
const Aulas = require("../data/aulas");
const Users = require("../data/users");
const scopes = require("../data/users/scopes");
const VerifyToken = require("../middleware/Token");
const cookieParser = require("cookie-parser");

const AulasRouter = (io) => {
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

        Aulas.findAll(req.pagination)
          .then((aulas) => {
            const response = {
              auth: true,
              ...aulas,
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

  // TESTE NOVA ROTA NAO FUNCIONAL
  // router
  //   .route("/create")
  //   .post(Users.autorize([scopes.Gestor]), async (req, res, next) => {
  //     let body = req.body;
  //     try {
  //       if (req.body.beginDate > req.body.endDate)
  //         throw new Error("INVALID DATE");

  //       if (
  //         new Date(req.body.beginDate) < new Date() ||
  //         new Date(req.body.endDate) < new Date()
  //       )
  //         throw new Error("JA PASSOU");
  //     } catch (err) {
  //       res.status(500).json({ message: err.message });
  //     }
  //   });

  //ROTA ANTIGA FUNCIONAL
  router
    .route("/create")
    .post(Users.autorize([scopes.Gestor]), function (req, res, next) {
      let body = req.body;

      Aulas.create(body)
        .then(() => {
          console.log("Aula criada com sucesso!");
          io.sockets.emit("gestor_notifications", {
            message: "Add new aula",
            key: "Aula",
          });
          res.status(200);
          res.send(body);
          next();
        })
        .catch((err) => {
          console.log("Ocorreu um erro ao adicionar a aula!");
          console.log(err.message);
          err.status = err.status || 500;
          res.status(401);
          next();
        });
    });

  router
    .route("/:aulaId")
    .get(
      Users.autorize([scopes.Gestor, scopes.Vip]),
      function (req, res, next) {
        console.log("get aula by id");
        let aulaId = req.params.aulaId;
        Aulas.findAulaById(aulaId)
          .then((aula) => {
            res.status(200);
            res.send(aula);
            next();
          })
          .catch((err) => {
            res.status(404);
            next();
          });
      }
    )
    .put(Users.autorize([scopes.Gestor]), function (req, res, next) {
      console.log("Update aula by id");
      let aulaId = req.params.aulaId;
      let body = req.body;

      Aulas.update(aulaId, body)
        .then((aula) => {
          res.status(200);
          res.send(aula);
          next();
        })
        .catch((err) => {
          res.status(404);
          next();
        });
    })
    .delete(Users.autorize([scopes.Gestor]), function (req, res, next) {
      const id = req.params.aulaId;
      Aulas.removeById(id)
        .then((result) => {
          res.status(200).json({
            mesage: "CLASS SUCCESSFULLY DELETED",
            request: {
              type: "GET",
              description: "LISTA DE AULAS",
              url: "http://localhost:5000/aulas",
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

module.exports = AulasRouter;
