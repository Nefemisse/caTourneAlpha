const asyncLib = require('async')
const models = require('../models')

module.exports = {
    create: (req, res) => {
        // Parameters
        let nom = req.body.nom;
        let description = req.body.description

        // Fields verification
        if (nom == "") return res.status(400).json({'error': 'An error occured : Missing parameters'});
            let newCategories = models.Categories.create({
                nom: nom,
                description: description
            })
            .catch((err) => {
                return res.status(500).json({'error': 'An error occurred : unable to create Categories'})
            });
        if(newCategories) return res.status(201).json({'idCategories': newCategories.id, 'success': 'Categories successfully created'})
    },
    update: (req, res) => {
        // Parameters
        let id = req.params.id;
        let nom = req.body.nom;
        let description = req.body.description
        // Waterfall
        asyncLib.waterfall([
            (done) => {
                models.Categories.findOne({
                    attributes: ['id', 'updatedAt'],
                    where: { id: id }
                })
                .then((CategoriesFound) => {
                    done(null, CategoriesFound);
                })
                .catch((err) => {
                    return res.status(400).json({ 'error': 'Unable to verify Categories' });
                });
            },
            (CategoriesFound, done) => {
                if(CategoriesFound) {
                    CategoriesFound.update({
                        nom: (nom ? nom : CategoriesFound.nom),
                        description: (description ? description : CategoriesFound.description)
                    })                 
                    .then((CategoriesFound) => {
                        done(CategoriesFound);
                    })
                    .catch((err) => {
                        res.status(400).json({ 'error': 'An error occurred : unable to update categorie' });
                    });
                } else {
                  res.status(404).json({ 'error': "An error occurred : categorie doesn't found" });
                }
            },
        ],
        (CategoriesFound) => {
            CategoriesFound ? res.status(200).json({'success': 'Categories successfuly modified'}) : res.status(400).json({ 'error': 'An error occurred : unable to update categorie' })
        })           
    },
    searchOne: (req, res) => {
        // Parameters
        const id = req.params.id;
        models.Categories.findOne({
            attributes: ['id', 'nom', 'description'],
            where: { id: id }
        })
        .then(data => {
            data ? res.status(200).send(data) : res.status(400).send({message: `An error occurred : cannot found categorie with id=${id}.`});
        })
        .catch(err => {
            res.status(400).send({
                message: `An error occurred : could not found Categories with id=${id}.`
            });
        });
    },
    searchAll: (req, res) => {
        models.Categories.findAll({
            attributes: ['id', 'nom', 'description'],
        })
        .then(data => {
             if (data) res.status(200).send(data);
        })
        .catch(err => {
            console.log(err)
            res.status(400).send({message: "An error occurred : while retrieving Categories."});
        });
    },

    // Have to verify identity with ? Token ?
    delete: (req, res) => {
        // Parameters
        const id = req.params.id;
        
        models.Categories.destroy({
            where: { id: id }
        })
        .then(num => {
            num == 1 ? res.status(200).send({message: "Categories successfully deleted"}) : res.status(400).send({message: `An error occurred : cannot delete Categories with id=${id}.`});
        })
        .catch(err => {
            console.log(err);
            res.status(404).send({
                message: "Categories with id=" + id + " was not found"
            });
        });
    }
}