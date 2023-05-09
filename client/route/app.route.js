const express = require("express");
const router = express.Router();
const userCtrl = require("../controllerFront/user.ctrl");
const annoncesCtrl = require("../controllerFront/annonces.ctrl");
const detailAnnonces = require("../controllerFront/candidature");
const path = require("path");
const db = require("../connection");
const multer = require("multer");

const resultPerPage = 3;

exports.router = (() => {
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/avatars");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        Date.now() + file.originalname + path.extname(file.originalname)
      );
    },
  });

  var upload = multer({ storage: storage });
  // Home
  router.get("/", (req, res) => {
    let sqlAnnonces = "SELECT * FROM Annonces";
    db.query(sqlAnnonces, (err, result) => {
      profil = {
        id: req.cookies.id,
        prenom: req.cookies.prenom,
        success: req.cookies.success,
        token: req.cookies.token,
      };
      if (err) throw err;
      const numOfResults = result.length;
      const numberOfPages = Math.ceil(numOfResults / resultPerPage);
      let page = req.query.page ? Number(req.query.page) : 1;
      if (page > numberOfPages) {
        res.redirect("/?page=" + encodeURIComponent(numberOfPages), {
          profil: profil,
        });
      } else if (page < 1) {
        res.redirect("/?page=" + encodeURIComponent("1"), { profil: profil });
      }
      // Determine SQL LIMIT starting
      const startingLimit = (page - 1) * resultPerPage;

      sqlAnnonces = `SELECT * FROM Annonces ORDER BY id DESC LIMIT ${startingLimit}, ${resultPerPage}`;
      db.query(sqlAnnonces, (err, result) => {
        if (err) throw err;
        let iterator = page - 2 < 1 ? 1 : page - 1;
        let endingLink =
          iterator + 6 <= numberOfPages
            ? iterator + 6
            : page + (numberOfPages - page);
        if (endingLink < page + 1) {
          iterator -= page + 1 - numberOfPages;
        }
        res.render("pages/index", {
          data: result,
          page,
          iterator,
          endingLink,
          numberOfPages,
        });
      });
    });
  });

  // Users route
  // Login
  router.get("/login", (req, res) => {
    if (req.cookies.token) {
      res.redirect("/profil");
    } else {
      res.render("pages/login", {
        token: req.cookies.token,
      });
    }
  });
  router.post("/login", userCtrl.login, (req, res) => {
    res.render("pages/register", {
      data: data,
      token: req.cookies.token,
    });
  });

  // Register
  router.get("/register", (req, res) => {
    res.render("pages/register", {
      token: req.cookies.token,
    });
  });
  router.post("/register", upload.single("photoProfil"), userCtrl.register);

  // Logout
  router.get("/logout", userCtrl.logout);

  // Profil
  router.get("/profil", userCtrl.getUserById);

  router.post("/profil", userCtrl.updateProfil, (req, res) => {
    res.render("pages/profil", {
      id: req.cookies.id,
      token: req.cookies.token,
      prenom: req.cookies.prenom,
    });
  });

  // Annonces route
  // Annoncer
  router.get("/annoncer", (req, res) => {
    res.render("pages/annoncer", {
      token: req.cookies.token,
      success: req.cookies.success,
      error: req.cookies.error,
    });
  });
  router.post("/annoncer", annoncesCtrl.create, (req, res) => {
    res.render("pages/annoncer", {
      token: req.cookies.token,
    });
  });

  // Detail Annonces
  router.get("/detailAnnonce/:id", annoncesCtrl.getAnnoncesById, (req, res) => {
    res.render("pages/detailAnnonce", {
      token: req.cookies.token,
    });
  });

  router.post("/create/candidature/:id", detailAnnonces.create, (req, res) => {
    res.render("pages/index", {
      token: req.cookies.token,
      id: req.cookies.id,
      prenom: req.cookies.prenom,
    });
  });

  // router.post('/send', (req, res) => {
  // console.log(req.body);
  // })

  return router;
})();
