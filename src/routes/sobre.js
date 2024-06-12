const express = require('express');
const router = express.Router()

router.get('/sobre', (req, res) => {
    res.render('about', {
        title:'Sobre Nós',
        cssPath: '/css/about/about.min.css'
    })
})

module.exports = router