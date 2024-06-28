const express = require('express')
const exphbs = require('express-handlebars')
const { connect } = require('http2')
const router = require('./routes/routes')
const products = require('./products');

const app = express()

app.use(router)

app.use(express.static(__dirname + '../../' + 'public'))

app.engine('handlebars', exphbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, 'views', 'layouts')
}))
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'))

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