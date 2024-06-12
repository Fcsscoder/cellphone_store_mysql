const express = require('express');
const router = express.Router()

const products = require('../products')

router.get('/produtos/:id', (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    if (!product) {
        return res.status(404).render('errorview', {
            title: 'Produto não encontrado',
            cssPath: '/css/error/error.min.css'
        });
    }

    const cellphone = products[req.params.id - 1]

    res.render('productsview', { 
        cssPath: '/css/cellphone/cellphone.min.css',
        title: cellphone.product,
        cellphone
    })
})

module.exports = router