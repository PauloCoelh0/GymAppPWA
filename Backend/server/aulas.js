const bodyParser = require("body-parser");
const express = require("express");
const Aulas = require("../data/aulas");
const Users = require("../data/users");
const scopes = require("../data/users/scopes");
const VerifyToken = require("../middleware/Token");
const cookieParser = require("cookie-parser");
const Aula = require("../data/aulas/aulas");
const User = require("../data/users/users");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage: storage });

const AulasRouter = (io) => {
  let router = express();

  router.use(bodyParser.json({ limit: "100mb" }));
  router.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

  router.use(cookieParser());
  router.use(VerifyToken);

  router
    .route("")
    .get(
      Users.authorize([scopes.Gestor, scopes.Normal, scopes.Vip]),
      function (req, res, next) {
        const pageLimit = req.query.limit ? parseInt(req.query.limit) : 20;
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

  //ROTA ANTIGA FUNCIONAL
  router
    .route("/create")
    .post(
      Users.authorize([scopes.Gestor]),
      upload.single("aulaImage"),
      async (req, res, next) => {
        let body = req.body;
        const aula = new Aula({
          name: req.body.name,
          room: req.body.room,
          beginDate: req.body.beginDate,
          endDate: req.body.endDate,
          capacity: req.body.capacity,
          participants: req.body.participants,
          registrations: req.body.registrations,
          aulaImage: req.file.path,
        });
        try {
          if (req.body.beginDate > req.body.endDate)
            throw new Error("INVALID DATE");
          console.log(aula);
          if (
            new Date(req.body.beginDate) < new Date() ||
            new Date(req.body.endDate) < new Date()
          )
            throw new Error("JA PASSOU");

          await Aula.find({ room: req.body.room })
            .exec()
            .then((list) => {
              list.forEach((x) => {
                if (
                  (new Date(req.body.beginDate) >= x.beginDate &&
                    new Date(req.body.beginDate) <= x.endDate) ||
                  (new Date(req.body.endDate) >= x.beginDate &&
                    new Date(req.body.endDate) <= x.endDate)
                )
                  throw new Error("ROOM ALREADY IN USE ON THIS DATE");
              });
              return;
            });

          Aulas.create(aula).then(() => {
            console.log("Aula criada com sucesso!");
            io.sockets.emit("gestor_notifications", {
              message:
                "Aula de " +
                aula.name +
                " na sala " +
                aula.room +
                " disponivel para inscrição! ",
              key: "Aula",
            });
            res.status(200);
            res.send(aula);
            next();
          });
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      }
    );

  router
    .route("/:aulaId")
    .get(
      Users.authorize([scopes.Gestor, scopes.Vip]),
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

    .put(
      Users.authorize([scopes.Gestor, scopes.Vip, scopes.Normal]),
      async function (req, res, next) {
        let aulaId = req.params.aulaId;

        try {
          const aulaEncontrada = await Aula.findOne({ _id: aulaId });

          // const alunoEncontrado = await User.find({ _id: body });
          // // alunoEncontrado.forEach((z) => {
          // //   console.log(z);

          // if (!alunoEncontrado) throw new Error("User nao existe");

          aulaEncontrada.registrations.forEach((x) => {
            if (x === req.body._id) throw new Error("Aluno ja registado");
          });

          aulaEncontrada.registrations.push(req.body._id);

          if (aulaEncontrada.participants >= aulaEncontrada.capacity)
            throw new Error("Capacidadade maxima atingida");

          aulaEncontrada.participants = aulaEncontrada.registrations.length;
          await aulaEncontrada.save();
          res.status(200);
          res.send("User Registado na Aula com Sucesso");
        } catch (err) {
          res.status(500);
          res.send(err.message);
        }
      }
    )

    .delete(Users.authorize([scopes.Gestor]), async function (req, res, next) {
      let aulaId = req.params.aulaId;

      try {
        const aulaEncontrada = await Aula.findOne({ _id: aulaId });
        if (aulaEncontrada.registrations.length != 0)
          throw new Error("Nao pode apagar, aula ja contem utilizadores");

        Aulas.removeById(aulaId).then((result) => {
          res.status(200).json({
            mesage: "CLASS SUCCESSFULLY DELETED",
            request: {
              type: "GET",
              description: "LISTA DE AULAS",
              url: "http://localhost:5000/aulas",
            },
          });
        });
      } catch (err) {
        res.status(500);
        res.send(err.message);
        console.log(err.message);
      }
    });

  router
    .route("/update/:aulaId")
    .put(
      Users.authorize([scopes.Gestor, scopes.Vip, scopes.Normal]),
      function (req, res, next) {
        console.log("Update aula by id");
        let aulaId = req.params.aulaId;
        let body = req.body;
        Aulas.update(aulaId, body)
          .then((aula) => {
            console.log("fixe");
            res.status(200);
            res.send(aula);
            next();
          })
          .catch((err) => {
            console.log("nao ta a dar");
            res.status(404);
            next();
          });
      }
    );

  router
    .route("/remove/:aulaId")
    .put(
      Users.authorize([scopes.Gestor, scopes.Vip, scopes.Normal]),
      async function (req, res, next) {
        let aulaId = req.params.aulaId;

        try {
          const aulaEncontrada = await Aula.findOne({ _id: aulaId });

          aulaEncontrada.registrations.pull(req.body._id);

          aulaEncontrada.participants = aulaEncontrada.length;
          await aulaEncontrada.save();
          res.status(200);
          res.send("User removido da Aula com Sucesso");
        } catch (err) {
          res.status(500);
          res.send(err.message);
        }
      }
    );

  router
    .route("/subscription/:classId/:userId")
    .get(
      Users.authorize([scopes.Gestor, scopes.Vip, scopes.Normal]),
      function (req, res, next) {
        const classId = req.params.classId;
        const userId = req.params.userId;

        Aula.findById(classId)
          .then((foundClass) => {
            // Check if user is already subscribed
            const isSubscribed = foundClass.registrations.includes(userId);

            // Get current number of participants
            const participants = foundClass.registrations.length;

            res.send({
              isSubscribed: isSubscribed,
              participants: participants,
            });
          })
          .catch((err) => {
            res.status(500).send({ error: err });
          });
      }
    );

  router
    .route("/subscription/:userId")
    .get(
      Users.authorize([scopes.Gestor, scopes.Vip, scopes.Normal]),
      function (req, res, next) {
        const userId = req.params.userId;

        Aula.find({ registrations: userId })
          .then((foundClasses) => {
            res.send(foundClasses);
          })
          .catch((err) => {
            res.status(500).send({ error: err });
          });
      }
    );

  return router;
};

module.exports = AulasRouter;
