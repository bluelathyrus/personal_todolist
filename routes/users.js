const express = require('express')
const User = require('../models/user')
const List = require('../models/list')

const router = express.Router()

router.route('/')
    .get(async (req, res, next) => {
        try {
            const users = await User.findAll()
            res.json(users)
        } catch {
            console.error(err)
            next(err)
        }
    })
    .post(async (req, res, next) => {
        try {
            const user = await User.create({
                name: req.body.name,
            })
            console.log(user)
            res.status(201).json(user)
        } catch {
            console.error(err)
            next(err)
        }
    })

router.get('/:id/lists', async(req, res, next) => {
    try {
        const lists = await List.findAll({
            include: {
                model: User,
                where: { id: req.params.id },
            },
        })
        res.json(lists)
    } catch (err) {
        console.error(err)
        next(err)
    }
})

module.exports = router