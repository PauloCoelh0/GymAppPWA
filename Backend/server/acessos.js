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
  // router.use(VerifyToken);

  router
    .route("")
    .get(
      Users.authorize([scopes.Gestor, scopes.Normal, scopes.Vip]),
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

  router.route("/create").post(function (req, res, next) {
    const { _id, entryHour, local } = req.body;

    Users.findUserById(_id)
      .then((user) => {
        const role = user.role.name;
        console.log(role);
        console.log(local);

        const rolesLocations = {
          normal: ["entrada", "jacuzzi", "banhoturco"],
          Vip: ["entrada", "jacuzzi", "banhoturco"],
          gestor: ["entrada", "jacuzzi", "banhoturco"],
        };

        switch (role) {
          case "normal":
            if (rolesLocations.normal.includes(local)) {
              Acessos.create({ _id, entryHour, local })
                .then((response) => {
                  console.log("Access granted to " + local + "!");
                  res.status(200).send({ message: "Access granted" });
                })
                .catch((err) => {
                  res
                    .status(500)
                    .send({ message: "Error creating access", error: err });
                });
            } else {
              console.log("Access denied to " + local);
              res.status(401).send({ message: "Access denied" });
            }
            break;
          case "Vip":
            if (rolesLocations.Vip.includes(local)) {
              Acessos.create({ _id, entryHour, local })
                .then((response) => {
                  console.log("Access granted to " + local + "!");
                  res.status(200).send({ message: "Access granted" });
                })
                .catch((err) => {
                  res
                    .status(500)
                    .send({ message: "Error creating access", error: err });
                });
            } else {
              console.log("Access denied to " + local);
              res.status(401).send({ message: "Access denied" });
            }
            break;
          case "gestor":
            if (rolesLocations.gestor.includes(local)) {
              Acessos.create({ _id, entryHour, local })
                .then((response) => {
                  console.log("Access granted to " + local + "!");
                  res.status(200).send({ message: "Access granted" });
                })
                .catch((err) => {
                  res
                    .status(500)
                    .send({ message: "Error creating access", error: err });
                });
            } else {
              console.log("Access denied to " + local);
              res.status(401).send({ message: "Access denied" });
            }
            break;
          default:
            console.log("Invalid local");
            res.status(400).send({ message: "Invalid location" });
            break;
        }
      })
      .catch((err) => {
        res.status(404);
        res.send(err.message);
        next();
      });
  });

  // router
  //   .route("/create")
  //   .post(Users.authorize([scopes.Gestor]), function (req, res, next) {
  //     const { _id, entryHour, local } = req.body;

  //     Users.findUserById(_id)
  //       .then((user) => {
  //         const role = user.role.name;

  //         switch (role) {
  //           case "normal":
  //             if (local === "Entrada") {
  //               console.log("Access granted to Entrada");
  //             } else {
  //               console.log("Access denied to " + local);
  //             }
  //             break;
  //           case "vip":
  //             if (
  //               local === "Entrada" ||
  //               local === "Jacuzzi" ||
  //               local === "BanhoTurco"
  //             ) {
  //               console.log("Access granted to " + local);
  //             } else {
  //               console.log("Access denied to " + local);
  //             }
  //             break;
  //           case "gestor":
  //             if (
  //               local === "Entrada" ||
  //               local === "Jacuzzi" ||
  //               local === "BanhoTurco"
  //             ) {
  //               console.log("Access granted to " + local);
  //             } else {
  //               console.log("Access denied to " + local);
  //             }
  //             break;
  //           default:
  //             console.log("Access denied to " + local);
  //         }
  //       })
  //       .catch((err) => {
  //         res.status(404);
  //         next();
  //       });

  //     Acessos.create(body)
  //       .then(() => {
  //         console.log("Acesso criada com sucesso!");
  //         res.status(200);
  //         res.send(body);
  //         next();
  //       })
  //       .catch((err) => {
  //         console.log("Ocorreu um erro ao adicionar a acesso!");
  //         console.log(err.message);
  //         err.status = err.status || 500;
  //         res.status(401);
  //         next();
  //       });
  //   });

  router
    .route("/:acessoId")
    .get(
      Users.authorize([scopes.Gestor, scopes.Vip]),
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
    .put(Users.authorize([scopes.Gestor]), function (req, res, next) {
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
    .delete(Users.authorize([scopes.Gestor]), function (req, res, next) {
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
