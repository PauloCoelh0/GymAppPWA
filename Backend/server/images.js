const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const Acessos = require("../data/acessos");
const Users = require("../data/users");
const Images = require("../data/images");
const scopes = require("../data/users/scopes");
const VerifyToken = require("../middleware/Token");
const cookieParser = require("cookie-parser");
const Aula = require("../data/aulas/aulas");
const Image = require("../data/images/images");
const multer = require("multer");

const ImagesRouter = () => {
  let router = express();

  router.use(bodyParser.json({ limit: "100mb" }));
  router.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

  router.use(cookieParser());
  router.use(VerifyToken);

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });
  const upload = multer({ storage: storage });

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

        Images.findAll(req.pagination)
          .then((images) => {
            const response = {
              auth: true,
              ...images,
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
    .post(
      Users.authorize([scopes.Gestor]),
      upload.single("aulaImage"),
      function (req, res) {
        const id = req.body.aula;
        Aula.findById(id)
          .then(() => {
            console.log("id:" + id);
            const image = new Image({
              _id: mongoose.Types.ObjectId(),
              aula: id,
              aulaImage: req.file.path,
            });
            return image.save();
          })
          .then((result) => {
            console.log(result);
            res.status(201).json({
              message: "IMAGE SUCCESSFULLY UPLOADED",
              ImageAulaDetails: {
                imgId: result._id,
                aulaId: result.aula,
              },
              request: {
                type: "GET",
                url: "http://localhost:3200/stand/images/" + result._id,
              },
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              error: err,
            });
          });
      }
    );

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
          .catch(() => {
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
        .catch(() => {
          res.status(404);
          next();
        });
    })
    .delete(Users.authorize([scopes.Gestor]), function (req, res) {
      const id = req.params.acessoId;
      Acessos.removeById(id)
        .then(() => {
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

module.exports = ImagesRouter;
