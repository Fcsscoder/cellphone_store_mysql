const express = require('express')
const exphbs = require('express-handlebars')

const port = 3000

const app = express()

const hbs = exphbs.create({
    partialsDir: ['views/partials']
})

app.use(express.static('public'))

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

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
        imgPath: '/img/celulares/s23u.webp',
        cssId: 'img3'
    }
]

app.get('/products/:id', (req, res) => {
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
        products,
     })
})

app.use((req, res, next) => {
    res.status(404).render('errorview', {
        title: '404 Error',
        cssPath: '/css/error/error.min.css'
    });
});

app.listen(port, () => {
    console.log(`App rondando na porta ${port}`)
})