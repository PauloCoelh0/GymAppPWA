const bodyParser = require("body-parser");
const express = require("express");
const Acessos = require("../data/acessos");
const Acesso = require("../data/acessos/acessos");
const Users = require("../data/users");
const cookieParser = require("cookie-parser");

const AcessosRouter = (io) => {
  let router = express();

  router.use(bodyParser.json({ limit: "100mb" }));
  router.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

  router.use(cookieParser());
  // router.use(VerifyToken);

  router.route("").get(function (req, res, next) {
    const pageLimit = req.query.limit ? parseInt(req.query.limit) : 5;
    const pageSkip = req.query.skip ? pageLimit * parseInt(req.query.skip) : 0;

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
  });

  router.route("/:userId").get(function (req, res, next) {
    const userId = req.params.userId;
    console.log(userId);
    console.log(req.params.userId);

    Acesso.find({ user: userId })
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
  });

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

  return router;
};

module.exports = AcessosRouter;
