// Imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncLib = require("async");
const models = require("../models");
const fs = require("fs");

// REGEX
const EMAIL_REGEX = /^([^<>\[\]\\,;:\s@"]*)@([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}$/;
const PASWORD_REGEX =
  /(?=[A-Za-z0-9éèàêëàâäuùûüiîïoôöyŷÿæÆÐ!@#&$()[{.\]\}-]+$)^(?=.*[0-9])(?=.*[A-Z]).{8,255}$/;

module.exports = {
  register: (request, response) => {
    // Parameters
    let nom = request.body.nom;
    let prenom = request.body.prenom;
    let tel = request.body.tel;
    let mobile = request.body.mobile;
    let email = request.body.email;
    let adresse = request.body.adresse;
    let ville = request.body.ville;
    let codePostal = request.body.codePostal;
    let nomProduction = request.body.nomProduction;
    let siteWeb = request.body.siteWeb;
    let siret = request.body.siret;
    let password = request.body.password;
    let birthdate = request.body.birthdate;
    let nomTitulaireCompte = request.body.nomTitulaireCompte;
    let iban = request.body.iban;
    let photoProfil = request.body.photoProfil;

    // Fields verification
    if (
      nom == "" ||
      prenom == "" ||
      email == "" ||
      password == "" ||
      adresse == "" ||
      ville == "" ||
      codePostal == ""
    )
      return response
        .status(400)
        .json({ error: "An error occured : Missing parameters" });

    // Regex
    if (!EMAIL_REGEX.test(email))
      return response
        .status(400)
        .json({ error: "An error occured : email is not valid" });
    if (!PASWORD_REGEX.test(password))
      return response.status(400).json({
        error:
          "An error occured : password invalid (must length 8 - 255 and include 1 number, 1 uppercase, 1 lowercase minimum)",
      });

    // Waterfall
    asyncLib.waterfall(
      [
        (done) => {
          models.Users.findOne({
            attributes: ["email"],
            where: { email: email },
          })
            .then((userFound) => {
              done(null, userFound);
            })
            .catch((err) => {
              fs.unlinkSync(req.fil.path);
              return response
                .status(400)
                .json({ error: "Email already exist" });
            });
        },
        (userFound, done) => {
          !userFound
            ? bcrypt.hash(password, 5, (err, bcryptedPassword) => {
                done(null, userFound, bcryptedPassword);
              })
            : response.status(409).json({ error: "user already exist." });
        },
        (userFound, bcryptedPassword, done) => {
          let newUser = models.Users.create({
            nom: nom,
            prenom: prenom,
            tel: tel,
            mobile: mobile,
            email: email,
            adresse: adresse,
            ville: ville,
            codePostal: codePostal,
            nomProduction: nomProduction,
            siteWeb: siteWeb,
            siret: siret,
            password: bcryptedPassword,
            birthdate: birthdate,
            nomTitulaireCompte: nomTitulaireCompte,
            iban: iban,
            photoProfil: photoProfil,
          })
            .then((newUser) => {
              done(newUser);
            })
            .catch((err) => {
              return response
                .status(500)
                .json({ error: "An error occurred : unable to verify user" });
            });
        },
      ],
      (newUser) => {
        newUser
          ? response.status(201).json({
              userId: newUser.id,
              sucess: `${nom} ${prenom} bienvenu parmis nous.`,
              nom: `${nom}`,
              prenom: `${prenom}`,
            })
          : response
              .status(400)
              .json({ error: "An error occurred : user already exist." });
      }
    );
  },
  update: (request, response) => {
    // Parameters
    const id = request.params.id;
    let nom = request.body.nom;
    let prenom = request.body.prenom;
    let tel = request.body.tel;
    let mobile = request.body.mobile;
    let email = request.body.email;
    let adresse = request.body.adresse;
    let ville = request.body.ville;
    let codePostal = request.body.codePostal;
    let nomProduction = request.body.nomProduction;
    let siteWeb = request.body.siteWeb;
    let siret = request.body.siret;
    let password = request.body.password;
    let birthdate = request.body.birthdate;
    let nomTitulaireCompte = request.body.nomTitulaireCompte;
    let iban = request.body.iban;
    let photoProfil = request.body.photoProfil;

    // Waterfall
    asyncLib.waterfall(
      [
        (done) => {
          models.Users.findOne({
            attributes: ["id", "email", "prenom", "nom", "password"],
            where: { id: id },
          })
            .then((userFound) => {
              done(null, userFound);
            })
            .catch((err) => {
              return response
                .status(400)
                .json({ error: "Unable to verify user" });
            });
        },
        (userFound, done) => {
          userFound
            ? bcrypt.hash(password, 5, (err, bcryptedPassword) => {
                done(null, userFound, bcryptedPassword);
                userFound.update({ password: bcryptedPassword });
              })
            : response.status(409).json({ error: "user already exist." });
        },
        (userFound, bcryptedPassword, done) => {
          userFound
            ? userFound
                .update({
                  nom: nom ? nom : userFound.nom,
                  prenom: prenom ? prenom : userFound.prenom,
                  tel: tel ? tel : userFound.tel,
                  mobile: mobile ? mobile : userFound.mobile,
                  email: email ? email : userFound.email,
                  adresse: adresse ? adresse : userFound.adresse,
                  ville: ville ? ville : userFound.ville,
                  codePostal: codePostal ? codePostal : userFound.codePostal,
                  nomProduction: nomProduction
                    ? nomProduction
                    : userFound.nomProduction,
                  siteWeb: siteWeb ? siteWeb : userFound.siteWeb,
                  siret: siret ? siret : userFound.siret,
                  password: password ? bcryptedPassword : userFound.password,
                  birthdate: birthdate ? birthdate : userFound.birthdate,
                  nomTitulaireCompte: nomTitulaireCompte
                    ? nomTitulaireCompte
                    : userFound.nomTitulaireCompte,
                  iban: iban ? iban : userFound.iban,
                  photoProfil: photoProfil
                    ? photoProfil
                    : userFound.photoProfil,
                })
                .then((userFound) => {
                  done(userFound);
                })
                .catch((err) => {
                  response
                    .status(400)
                    .json({ error: "An error occurred : unable to update" });
                })
            : response
                .status(404)
                .json({ error: "An error occurred : user not found" });
        },
        (userFound, done) => {
          userFound
            ? bcrypt.hash(password, 5, (err, bcryptedPassword) => {
                done(null, userFound, bcryptedPassword);
              })
            : response.status(409).json({ error: "user already exist." });
        },
      ],
      (userFound) => {
        userFound
          ? response.status(200).json({
              success: `Votre profil a bien été modifié.`,
              prenom: userFound.prenom,
            })
          : response.status(400).json({ error: "An error occurred" });
      }
    );
  },
  getUserMe: (request, response, next) => {
    const UsersId = request.body.id; // Mettre le token

    if (UsersId < 0)
      return response
        .status(400)
        .json({ error: "An error occured: wrong token" });

    models.Users.findOne({
      attributes: ["id", "nom", "prenom", "email"],
      where: { id: UsersId },
    })
      .then((Users) => {
        if (Users) {
          request.Users = Users;
          response.status(201).json(Users);
          return next();
        } else {
          response.status(404).json({ error: "user not found" });
          return next();
        }
      })
      .catch((err) => {
        response.status(500).json({ error: "Cannot fetch user" });
      });
  },
  searchOne: (req, res) => {
    // Parameters
    const id = req.params.id;
    models.Users.findOne({
      attributes: [
        "id",
        "prenom",
        "nom",
        "tel",
        "email",
        "adresse",
        "ville",
        "codePostal",
        "nomProduction",
        "siteWeb",
        "nomTitulaireCompte",
        "iban",
        "isAdmin",
        "photoProfil",
      ],
      where: { id: id },
    })
      .then((data) => {
        data
          ? res.status(200).send(data)
          : res.status(400).send({
              message: `An error occurred : cannot found user with id=${id}. Maybe user was not found!`,
            });
      })
      .catch((err) => {
        res.status(400).send({
          message:
            `An error occurred : could not found user with id=${id}.` + err,
        });
      });
  },
  searchAll: (req, res) => {
    models.Users.findAll({
      attributes: [
        "id",
        "prenom",
        "nom",
        "tel",
        "email",
        "adresse",
        "ville",
        "codePostal",
        "nomProduction",
        "siteWeb",
        "nomTitulaireCompte",
        "iban",
        "photoProfil",
      ],
    })
      .then((data) => {
        if (data) {
          res.status(200).send(data);
        }
      })
      .catch((err) => {
        res.status(400).send({
          message: "An error occurred : while retrieving Users.",
        });
      });
  },
  delete: (request, response) => {
    // Parameters
    const id = request.params.id;

    models.Users.destroy({
      where: { id: id },
    })
      .then((num) => {
        num == 1
          ? response
              .status(200)
              .send({ message: "User successfully deleted 😊" })
          : response.status(400).send({
              message: `An error occurred : cannot delete user with id=${id}.`,
            });
      })
      .catch((err) => {
        response.status(404).send({
          message: "User with id=" + id + " was not found",
        });
      });
  },
  login: (request, response) => {
    // Parameters
    let email = request.body.email;
    let password = request.body.password;

    // Fields verification
    if (email == "" || password == "")
      return response.status(400).json({ error: "missing parameters" });

    models.Users.findOne({
      attributes: [`id`, `email`, `password`, "prenom", "nom", "photoProfil"],
      where: { email: email },
    })
      .then((userFound) => {
        if (userFound) {
          bcrypt.compare(
            password,
            userFound.password,
            (errBycrypt, resBycrypt) => {
              if (resBycrypt) {
                const token = jwt.sign({ id: userFound.id }, "YOUR_SECRET_KEY");
                return response.status(200).json({
                  success: `${userFound.prenom} vous vous êtes connecté avec succès 😊 👌`,
                  token,
                  id: userFound.id,
                  prenom: userFound.prenom,
                  nom: userFound.nom,
                  tel: userFound.tel,
                  email: userFound.email,
                  photoProfil: userFound.photoProfil,
                });
              } else {
                return response.status(403).json({ error: "invalid password" });
              }
            }
          );
        } else {
          return response.status(404).json({ error: "User not exist in DB" });
        }
      })
      .catch((err) => {
        return response.status(500).json({
          "An error occurred": "Unable to verify user, maybe invalid email",
        });
      });
  },
  // logout: (request, response) => {
  //     return response.clearCookie('token').status(200).json({success: "Successfully logged out 😏 🍀"});
  // },
};
