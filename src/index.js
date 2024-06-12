const express = require('express')
const exphbs = require('express-handlebars')
const { connect } = require('http2')
const router = require('./routes/routes')
const products = require('./products');

const app = express()

app.use(router)

const hbs = exphbs.create({
    partialsDir: ['views/partials']
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('home', { 
        cssPath: '/css/home/home.min.css',
        title: 'Início',
        icon: '/img/icon/home-icon.png',
        products,
     })
})

app.use((req, res, next) => {
    res.status(404).render('errorview', {
        title: 'Página não encontrada',
        cssPath: '/css/error/error.min.css'
    });
});

app.listen(3000)