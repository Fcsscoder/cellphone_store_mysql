const express = require('express')
const exphbs = require('express-handlebars')
const { connect } = require('http2')
const mysql = require('mysql')

const app = express()

const products = [
    {
        id: '1',
        product: 'Moto G52',
        brand: 'Motorola',
        price: 'R$1.199',
        imgPath: '/img/celulares/motog52.png',
        cssId: 'img1'
    },
    {
        id: '2',
        product: 'Iphone 11',
        brand: 'Apple',
        price: 'R$4.999',
        imgPath: '/img/celulares/ios11.png',
        cssId: 'img2'
    },
    {
        id: '3',
        product: 'S23 Ultra',
        brand: 'Samsung',
        price: 'R$4.999',
        imgPath: '/img/celulares/s23u.png',
        cssId: 'img3'
    },
]

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

const hbs = exphbs.create({
    partialsDir: ['views/partials']
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/sobre', (req, res) => {
    res.render('about', {
        title:'Sobre Nós',
        cssPath: '/css/about/about.min.css'
    })
})

app.get('/contatos', (req, res) => {
    res.render('contact', {
        cssPath: '/css/contact/contact.min.css',
        title: 'Contatos',
        icon: '/img/icon/contact-icon.png'
    })
})

app.post('/contatos/post', (req, res) => {

    const email = req.body.email
    const message = req.body.message

    const query = `INSERT databank (email, message) VALUES ('${email}', '${message}')` 

    conn.query(query, (err) => {
        if(err) {
            console.log(err)
            return
        }

        res.redirect('/contatos')
    })
})

app.get('/produtos/:id', (req, res) => {
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

app.get('/', (req, res) => {
    res.render('home', { 
        cssPath: '/css/home/home.min.css',
        title: 'Início',
        icon: '/img/icon/home-icon.png',
        products,
     })
})

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database: 'nodesql'
})

conn.connect((err) => {
    if(err) {
        console.log(err)
        return
    }

    console.log('MySQL conectado!')
''
    app.listen({
        host: 'localhost',
        port: 3000
    })
})

app.use((req, res, next) => {
    res.status(404).render('errorview', {
        title: 'Página não encontrada',
        cssPath: '/css/error/error.min.css'
    });
});