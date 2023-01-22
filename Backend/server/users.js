const bodyParser = require("body-parser");
const express = require("express");
const Users = require("../data/users");
const scopes = require("../data/users/scopes");
const VerifyToken = require("../middleware/Token");
const Upload = require("../middleware/upload");
const cookieParser = require("cookie-parser");
const User = require("../data/users/users");

const UsersRouter = (io) => {
  let router = express();

  router.use(bodyParser.json({ limit: "100mb" }));
  router.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

  router.use(cookieParser());
  router.use(VerifyToken);

  //Get All Users (só gestores)
  router
    .route("")
    .get(Users.authorize([scopes.Gestor]), function (req, res, next) {
      console.log("get all users");

      const pageLimit = req.query.limit ? parseInt(req.query.limit) : 5;
      const pageSkip = req.query.skip
        ? pageLimit * parseInt(req.query.skip)
        : 0;

      req.pagination = {
        limit: pageLimit,
        skip: pageSkip,
      };

      Users.findAll(req.pagination)
        .then((users) => {
          const response = {
            auth: true,
            ...users,
          };
          res.send(response);
          next();
        })
        .catch((err) => {
          console.log(err.message);
          next();
        });
    });

  // Get perfil do user logado
  router.route("/perfil").get(function (req, res, next) {
    console.log("get the perfil of user");
    // the id is get when the token has decoded
    let userId = req.id;
    Users.findUserById(userId)
      .then((user) => {
        res.status(200);
        res.send({
          data: user,
        });
        next();
      })
      .catch((err) => {
        console.log("Perfil", err);
        res.status(404);
        next();
      });
  });

  router
    .route("/:userId")
    .post(Users.authorize([scopes.Gestor]), function (req, res, next) {
      console.log("update a member by id");
      let userId = req.params.userId;
      let body = req.body;
      console.log("entrei aqui");
      Users.update(userId, body)
        .then((user) => {
          res.status(200);
          res.send(user);
          next();
        })
        .catch((err) => {
          res.status(404);
          next();
        });
    })
    .get(Users.authorize([scopes.Gestor]), function (req, res, next) {
      console.log("get user by id");
      let userId = req.params.userId;
      Users.findUserById(userId)
        .then((user) => {
          res.status(200);
          res.send(user);
          next();
        })
        .catch((err) => {
          res.status(404);
          next();
        });
    })

    .delete(Users.authorize([scopes.Gestor]), function (req, res, next) {
      const id = req.params.userId;
      User.findByIdAndRemove(id)
        .exec()
        .then((result) => {
          res.status(200).json({
            mesage: "USER SUCCESSFULLY DELETED",
            request: {
              type: "GET",
              description: "GET ALL USERS LIST",
              url: "http://localhost:5000/users",
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

module.exports = UsersRouter;
