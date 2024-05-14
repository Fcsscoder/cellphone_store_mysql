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
        product: 'Celular',
        brand: 'Iphone',
        price: 'R$1.999',
        imgpath: '/img/cell.png',
        pagepath: ''
    },
    {
        id: '2',
        product: 'Celular',
        brand: 'Iphone',
        price: 'R$1.999',
        imgpath: '/img/cell.png'
    },
    {
        id: '3',
        product: 'Celular',
        brand: 'Iphone',
        price: 'R$1.999',
        imgpath: '/img/cell.png'
    }
]

app.get('/products/:id', (req, res) => {
    const id = req.params.id

    res.render('products', { products, id })
})

app.get('/', (req, res) => {
    res.render('home', { products })
})

app.get('/about', (req, res) => {
    // Simulando uma rota não encontrada
    res.status(404).render('errorview');
});

// Middleware para lidar com rotas não encontradas
app.use((req, res, next) => {
    res.status(404).render('errorview');
});

app.listen(port, () => {
    console.log(`App rondando na porta ${port}`)
})