// Imports
const fetch = require("node-fetch");

exports.register = (req, res) => {
  // Parameters
  let password1 = req.body.password1;
  let password = req.body.password;

  if (password1 == password) {
    fetch("http://localhost:8000/api/register", {
      method: "POST",
      body: JSON.stringify({
        nom: req.body.nom,
        prenom: req.body.prenom,
        tel: req.body.tel,
        mobile: req.body.mobile,
        email: req.body.email,
        adresse: req.body.adresse,
        ville: req.body.ville,
        codePostal: req.body.codePostal,
        nomProduction: req.body.nomProduction,
        siteWeb: req.body.siteWeb,
        siret: req.body.siret,
        password: req.body.password,
        birthdate: req.body.birthdate,
        nomTitulaireCompte: req.body.nomTitulaireCompte,
        iban: req.body.iban,
        photoProfil: req.file.filename,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error != undefined) {
          return false;
        } else {
          res.locals.prenom = data.prenom;
          profil = {
            id: data.id,
            token: data.token,
            prenom: data.prenom,
            tel: data.tel,
          };
          res.render("pages/login", {
            profil: profil,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

exports.login = (req, res) => {
  fetch("http://localhost:8000/api/login", {
    method: "POST",
    body: JSON.stringify({
      password: req.body.password,
      email: req.body.email,
    }),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error != undefined) {
        return data.error;
      } else {
        res.locals.error = "";
        res.locals.success = "Connecté";
        res.cookie("id", data.id);
        res.cookie("prenom", data.prenom);
        res.cookie("token", data.token);
        res.cookie("email", data.email);
        res.cookie("photoProfil", data.photoProfil);
        res.redirect("/profil");
      }
    });
};

exports.getUserById = (req, res) => {
  fetch("http://localhost:8000/api/getOneUser/" + req.cookies.id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: req.cookies.token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.id) {
        profil = {
          id: req.cookies.id,
          nom: req.cookies.nom,
          prenom: req.cookies.prenom,
          email: req.cookies.email,
          tel: data.tel,
          success: req.cookies.success,
        };
        res.cookie("success", "");
        res.cookie("tel", data.tel);
        if (data.isAdmin === "1") {
          res.redirect("http://localhost:8000/admin/resources/Users");
        } else {
          res.render("pages/profil", {
            data: data,
            profil: profil,
            token: req.cookies.token,
            isAdmin: req.cookies.isAdmin,
          });
        }
      } else {
        profil = {
          id: req.cookies.id,
          token: req.cookies.token,
          prenom: req.cookies.prenom,
          error: req.cookies.error,
        };
        res.render("pages/login", {
          profil: profil,
          data: data,
        });
      }
    });
};

(exports.searchOne = (req, res) => {
  fetch("http://localhost:8000/api/getOneUser/:id/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: req.cookies.tokenAnnonces,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        profil = {
          id: req.cookies.id,
          nom: req.cookies.nom,
          prenom: req.cookies.prenom,
          success: req.cookies.success,
          token: req.cookies.token,
          email: req.cookies.email,
          tel: req.cookies.tel,
        };
        res.cookie("success", "getOneUser");
        res.render("pages/admin", {
          data: data,
          profil: profil,
        });
      } else {
        profil = {
          id: req.cookies.id,
          tokenAnnonces: req.cookies.tokenAnnonces,
          error: req.cookies.error,
        };
        if (isAdmin == 1) {
          res.render("pages/admin", {
            profil: profil,
            data: data,
          });
        } else {
          res.render("pages/index", {
            profil: profil,
            data: data,
          });
        }
      }
    });
}),
  (exports.searchAll = (req, res) => {
    fetch("http://localhost:8000/api/getAllUsers/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: req.cookies.tokenAnnonces,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          profil = {
            id: req.cookies.id,
            nom: req.cookies.nom,
            prenom: req.cookies.prenom,
            success: req.cookies.success,
            token: req.cookies.token,
            email: req.cookies.email,
            tel: req.cookies.tel,
            photoProfil: req.cookies.photoProfil,
          };
          res.cookie("success", "getAllAnnonces");
          res.render("pages/index", {
            data: data,
            profil: profil,
          });
        } else {
          profil = {
            id: req.cookies.id,
            tokenAnnonces: req.cookies.tokenAnnonces,
            error: req.cookies.error,
          };
          if (isAdmin == 1) {
            res.render("pages/admin", {
              profil: profil,
              data: data,
            });
          } else {
            res.render("pages/index", {
              profil: profil,
              data: data,
            });
          }
        }
      });
  }),
  (exports.updateProfil = (req, res) => {
    fetch("http://localhost:8000/api/updateUser/" + req.cookies.id, {
      method: "PUT",
      body: JSON.stringify({
        nom: req.body.nom,
        prenom: req.body.prenom,
        tel: req.body.tel,
        mobile: req.body.mobile,
        email: req.body.email,
        adresse: req.body.adresse,
        ville: req.body.ville,
        codePostal: req.body.codePostal,
        nomProduction: req.body.nomProduction,
        siteWeb: req.body.siteWeb,
        siret: req.body.siret,
        password: req.body.password,
        birthdate: req.body.birthdate,
        nomTitulaireCompte: req.body.nomTitulaireCompte,
        iban: req.body.iban,
        description: req.body.description,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: req.cookies.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        res.cookie("success", data.success);
        res.cookie("prenom", data.prenom);
        res.redirect("/profil");
      });
  });

exports.logout = (req, res) => {
  profil = {
    id: req.cookies.id,
    token: req.cookies.token,
    prenom: req.cookies.prenom,
    error: req.cookies.error,
  };
  res
    .clearCookie("token")
    .clearCookie("id")
    .clearCookie("prenom")
    .clearCookie("success")
    .render("pages/login", { profil: profil });
};
