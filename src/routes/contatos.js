const express = require('express');
const router = express.Router()
const pool = require('../db/conn');

router.use(express.urlencoded({
    extended: true
}))

router.use(express.json())

router.get('/contatos', (req, res) => {
    res.render('contact', {
        cssPath: '/css/contact/contact.min.css',
        title: 'Contatos',
        icon: '/img/icon/contact-icon.png'
    })
})

router.post('/contatos/post', (req, res) => {
    const email = req.body.email
    const message = req.body.message

    const query = `INSERT databank (email, message) VALUES ('${email}', '${message}')` 

    pool.query(query, (err) => {
        if(err) {
            console.log(err)
            return
        }

        res.redirect('/contatos')
    })
})

module.exports = router