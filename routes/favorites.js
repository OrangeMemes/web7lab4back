const express = require('express');
const router = express.Router();
const pgp = require("pg-promise")();

const db = pgp(process.env.DB_URL);

router.route('/')
    .get(function (req, res) {
        db.query("SELECT id, name FROM favorites")
            .then(value => res.send(value))
            .catch(reason => res.status(500).send(reason))
    })
    .delete(function (req, res) {
        const id = req.query.id;
        if (!id) {
            res.status(400).send('id is required');
            return;
        }
        db.query("DELETE FROM favorites WHERE id = $1", [id])
            .then(value => res.send('OK'))
            .catch(reason => res.status(500).send(value))

    })
    .post(function (req, res) {
        const name = req.body.name;
        if (!name) {
            res.status(400).send('name is required');
            return;
        }
        db.one("INSERT INTO favorites(name) VALUES ($1) RETURNING id", [name])
            .then(value => res.send(value))
            .catch(reason => res.status(500).send(reason))
    })

;

module.exports = router;
