const asyncLib = require('async');
const jwt = require('jsonwebtoken');
const models = require('../models');

module.exports = {
    create: (req, res) => {
        // Parameters
        let idannonces = req.params.idannonces;
        let nom = req.body.nom;
        let email = req.body.email;
        let tel = req.body.tel;
        let candidature = req.body.candidature;
        let photo1 = req.body.photo1;
        let photo2 = req.body.photo2;

        // Fields verification
        if (nom == "" || email == "" || tel == "" ||  candidature == "") return res.status(400).json({'error': 'An error occured : Missing parameters'});
        // Waterfall
        asyncLib.waterfall([
            (done) => {
                models.Users.findOne({
                    attributes: ['nom', 'prenom','email', 'tel'],
                    where: { email: email}
                })
                .then((userFound) => {
                    done(null, userFound);
                })
                .catch((err) => {
                    return res.status(400).json({'error': 'An error occured'});
                });
            },
            (userFound, done) => {
                let newCandidature = models.Annonces.create({
                    idannonces: idannonces,
                    nom: nom,
                    email: email,
                    tel: tel,
                    candidature: candidature,
                    photo1: photo1,
                    photo2: photo2
                })
                .then((newCandidature) => {
                    done(newCandidature);
                })
                .catch((err) => {
                    console.log(err);
                    return res.status(500).json({'error': 'An error occurred : unable to create Candidature'})
                });
            }
        ],
        (newCandidature) => {
            const tokenCandidature = jwt.sign({ id: newCandidature.id }, "MY_SECRET_KEY");
            if(newCandidature) return res.status(201).json({message: 'idCandidature :' + newCandidature.id, 'success': 'Votre annonce a bien été créée', tokenCandidature, userFound})
        })
    },
}