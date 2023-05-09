const asyncLib = require('async');
const jwt = require('jsonwebtoken');
const models = require('../models');

module.exports = {
    create: (req, res) => {
        // Parameters
        let idcategories = req.body.idcategories; // get token cookie
        let nomContact = req.body.nomContact;
        let emailContact = req.body.emailContact;
        let siteWeb = req.body.siteWeb;
        let tel = req.body.tel;
        let siret = req.body.siret;
        let remuneration = req.body.remuneration;
        let adresseTournage = req.body.adresseTournage
        let ville = req.body.ville;
        let codePostal = req.body.codePostal
        let dateDebutTournage = req.body.dateDebutTournage
        let dateFinTournage = req.body.dateFinTournage
        let synopsis = req.body.synopsis
        let critereSelection = req.body.critereSelection

        // Fields verification
        if (nomContact == "" || emailContact == "" || tel == "" || siret == "" || ville == "" || codePostal == "" || synopsis == "" || remuneration == "" || critereSelection == "" || dateDebutTournage == "" || dateFinTournage == "" || adresseTournage == "") return res.status(400).json({'error': 'An error occured : Missing parameters'});
        // Waterfall
        asyncLib.waterfall([
            (done) => {
                let newAnnonces = models.Annonces.create({
                    idcategories: idcategories,
                    nomContact: nomContact,
                    emailContact: emailContact,
                    tel: tel,
                    siteWeb: siteWeb,
                    siret: siret,
                    ville: ville,
                    codePostal: codePostal,
                    synopsis: synopsis,
                    remuneration: remuneration,
                    critereSelection: critereSelection,
                    dateDebutTournage: dateDebutTournage,
                    dateFinTournage: dateFinTournage,
                    adresseTournage: adresseTournage
                })
                .then((newAnnonces) => {
                    done(newAnnonces);
                })
                .catch((err) => {
                    console.log(err);
                    return res.status(500).json({'error': 'An error occurred : unable to create Annonces'})
                });
            }
        ],
        (newAnnonces) => {
            const tokenAnnonces = jwt.sign({ id: newAnnonces.id }, "MY_SECRET_KEY");
            if(newAnnonces) return res.status(201).json({message: 'idannonces :' + newAnnonces.id, 'success': 'Votre annonce a bien été créée', tokenAnnonces})
        })
    },
    update: (req, res) => {
        // Parameters
        let id = req.params.id;
        let nomContact = req.body.nomContact;
        let emailContact = req.body.emailContact;
        let tel = req.body.tel;
        let siteWeb = req.body.siteWeb;
        let siret = req.body.siret;
        let remuneration = req.body.remuneration;
        let adresseTournage = req.body.adresseTournage
        let ville = req.body.ville;
        let codePostal = req.body.codePostal
        let dateDebutTournage = req.body.dateDebutTournage
        let dateFinTournage = req.body.dateFinTournage
        let synopsis = req.body.synopsis
        let critereSelection = req.body.critereSelection

        // Waterfall
        asyncLib.waterfall([
            (done) => {
                models.Annonces.findOne({
                    attributes: ['id', 'updatedAt'],
                    where: { id: id }
                })
                .then((AnnoncesFound) => {
                    done(null, AnnoncesFound);
                })
                .catch((err) => {
                    return res.status(400).json({ 'error': 'Unable to verify Annonces' });
                });
            },
            (AnnoncesFound, done) => {
                if(AnnoncesFound) {
                    AnnoncesFound.update({
                        nomContact: (nomContact ? nomContact : AnnoncesFound.nomContact),
                        emailContact: (emailContact ? emailContact : AnnoncesFound.emailContact),
                        tel: (tel ? tel : AnnoncesFound.tel),
                        siteWeb: (siteWeb ? siteWeb : AnnoncesFound.siteWeb),
                        siret: (siret ? siret : AnnoncesFound.siret),
                        ville: (ville ? ville : AnnoncesFound.ville),
                        codePostal: (codePostal ? codePostal : AnnoncesFound.codePostal),
                        synopsis: (synopsis ? synopsis : AnnoncesFound.synopsis),
                        remuneration: (remuneration ? remuneration : AnnoncesFound.remuneration),
                        critereSelection: (critereSelection ? critereSelection : AnnoncesFound.critereSelection),
                        dateDebutTournage: (dateDebutTournage ? dateDebutTournage : AnnoncesFound.dateDebutTournage),
                        dateFinTournage: (dateFinTournage ? dateFinTournage : AnnoncesFound.dateFinTournage),
                        adresseTournage: (adresseTournage ? adresseTournage : AnnoncesFound.adresseTournage)
                    })                 
                    .then((AnnoncesFound) => {
                        done(AnnoncesFound);
                    })
                    .catch((err) => {
                        res.status(400).json({ 'error': 'An error occurred : unable to update annonce' });
                    });
                } else {
                  res.status(404).json({ 'error': "An error occurred : annonce doesn't found" });
                }
            },
        ],
        (AnnoncesFound) => {
            AnnoncesFound ? res.status(200).json({'success': 'Annonce mise à jour'}) : res.status(400).json({ 'error': 'Une erreur est survenue: impossibilité de mettre à jour votre annonce, veuillez nous contacter.' })
        })           
    },
    searchOne: (req, res) => {
        // Parameters
        const id = req.params.id;
        models.Annonces.findOne({
            attributes: ['id', 'nomContact', 'emailContact', 'siteWeb', 'tel', 'siret', 'adresseTournage', 'ville', 'codePostal', 'synopsis', 'remuneration', 'critereSelection', 'dateDebutTournage', 'dateFinTournage', 'adresseTournage'],
            where: { id: id }
        })
        .then(data => {
            data ? res.status(200).send(data) : res.status(400).send({message: `An error occurred : cannot found Annonce with id=${id}.`});
        })
        .catch(err => {
            res.status(400).send({
                message: `An error occurred : could not found Annonces with id=${id}.`
            });
        });
    },
    searchAll: (req, res) => {
        models.Annonces.findAll({
            order: [['id','DESC']],
            attributes: ['id', 'nomContact', 'emailContact', 'siteWeb', 'tel', 'siret', 'adresseTournage', 'ville', 'codePostal', 'synopsis', 'remuneration', 'critereSelection', 'dateDebutTournage', 'dateFinTournage', 'adresseTournage'],
            // include: [
            //     {model:models.Users, attributes:['nom', 'prenom','email', 'id']},
            //     {model:models.Categories, attributes:['nom', 'description']}
            // ]
        })
        .then(data => {
             if (data) res.status(200).send(data);
        })
        .catch(err => {
            console.log(err)
            res.status(400).send({message: "An error occurred : while retrieving Annonces."});
        });
    },

    // Have to verify identity with ? Token ?
    delete: (req, res) => {
        // Parameters
        const id = req.params.id;
        
        models.Annonces.destroy({
            where: { id: id }
        })
        .then(num => {
            num == 1 ? res.status(200).send({message: "Annonces successfully deleted"}) : res.status(400).send({message: `An error occurred : cannot delete Annonces with id=${id}.`});
        })
        .catch(err => {
            res.status(404).send({
                message: "Annonces with id=" + id + " was not found"
            });
        });
    }
}