// Imports
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const UsersCtrl = require("../controleur/users.ctrl");
const annoncesCtrl = require("../controleur/annonces.ctrl");
const categoriesCtrl = require("../controleur/categories.ctrl");
const candidatureCtrl = require("../controleur/candidature.ctrl");

exports.router = (() => {
  // Users route
  router.post("/register", UsersCtrl.register);
  router.post("/login", UsersCtrl.login);

  //router.get('/me', auth, UsersCtrl.getUserMe);
  router.get("/getOneUser/:id", auth, UsersCtrl.searchOne);
  router.get("/getAllUsers", auth, UsersCtrl.searchAll);

  router.put("/updateUser/:id", auth, UsersCtrl.update);
  router.delete("/deleteUser/:id", auth, UsersCtrl.delete);

  // Annonces route
  router.get("/getOne/annonce/:id", annoncesCtrl.searchOne);
  router.get("/getAll/annonces", annoncesCtrl.searchAll);

  router.post("/create/annonce", annoncesCtrl.create);

  router.put("/update/annonce/:id", annoncesCtrl.update);
  router.delete("/delete/annonce/:id", annoncesCtrl.delete);

  // Candidature
  router.post("/create/candidature/:id", candidatureCtrl.create);

  // Categories route
  router.get("/getOne/categories/:id", categoriesCtrl.searchOne);
  router.get("/getAll/categories", categoriesCtrl.searchAll);

  router.post("/create/categories", categoriesCtrl.create);

  router.put("/update/categories/:id", categoriesCtrl.update);
  router.delete("/delete/categories/:id", categoriesCtrl.delete);

  return router;
})();
