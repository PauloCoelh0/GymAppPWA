const bodyParser = require("body-parser");
const express = require("express");
const Users = require("../data/users");
const cookieParser = require("cookie-parser");
const VerifyToken = require("../middleware/Token");
const multer = require("multer");
const User = require("../data/users/users");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage: storage });

function AuthRouter() {
  let router = express();

  router.use(bodyParser.json({ limit: "100mb" }));
  router.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

  //Registar utilizador

  router
    .route("/register")
    .post(upload.single("picture"), async function (req, res, next) {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
        address: req.body.address,
        country: req.body.country,
        // role: {
        //   name: req.body.role.name,
        //   scope: [req.body["role.role"].scope],
        // },
        picture: req.file.path,
      });
      try {
        const usertmp = await Users.create(user);
        const responsetmp = Users.createToken(usertmp.user);
        // .then((user) => Users.createToken(user))
        // .then((response) => {
        res.status(200);
        res.send(responsetmp);
        // })
        // .catch((err) => {
        //   res.status(500);
        //   res.send(err);
        //   next();
        // });
      } catch (err) {
        console.log(err);
        res.status(500);
        res.send(err);
        next();
      }
    });

  //Login

  router.route("/login").post(function (req, res, next) {
    let body = req.body;

    console.log("rota login");

    return Users.findUser(body)
      .then((user) => {
        const token = Users.createToken(user);
        const response = { ...token, userRole: user.role.name, user: user._id };
        return response;
      })
      .then((response) => {
        console.log("response", response);
        // The httpOnly: true setting means that the cookie can’t be read using JavaScript but can still be sent back to the server in HTTP requests
        res.cookie("token", response.token);
        res.cookie("userID", response.user);
        res.cookie("userRole", response.userRole);
        res.status(200);
        res.send(response);
      })
      .catch((err) => {
        console.log("error", err);
        res.status(500);
        res.send(err);
      });
  });

  router.use(cookieParser()); // Adicionar esta verificação
  router.use(VerifyToken); // Adicionar esta verificação

  router.route("/logout").get(function (req, res, next) {
    // The httpOnly: true setting means that the cookie can’t be read using JavaScript but can still be sent back to the server in HTTP requests
    // MaxAge : It allows us to invalidate the cookie
    res.clearCookie("token");

    res.status(200);
    res.send({ logout: true });
    next();
  });

  router.route("/me").get(function (req, res, next) {
    return new Promise(() => {
      res.status(202).send({ auth: true, decoded: req.roleUser });
    }).catch((err) => {
      res.status(500);
      res.send(err);
      next();
    });
  });

  return router;
}

module.exports = AuthRouter;
