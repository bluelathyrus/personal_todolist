const express = require('express')
const { User, List } = require('../models')

const router = express.Router()

router.route('/')
    .get (async (req, res, next) => {
        try {
            const lists = await List.findAll()
            res.json(lists)
        } catch (err) {
            console.error(err)
            next(err)
        }
    })
    .post( async(req, res, next) => {
        try {
            const list = await List.create({
                participant: req.body.id,
                list: req.body.list,
            })
            console.log(list)
            res.status(201).json(list)
        } catch (err) {
            console.error(err)
            next(err)
        }
    })

module.exports = router