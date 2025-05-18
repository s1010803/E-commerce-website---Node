const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
const classRoutes = require('./routes/classRoutes');
const caroRoute = require('./routes/caro');
const hotRoute = require('./routes/hotRoute');
const cardRoute = require('./routes/productsCardRouter');
const allProductsRoute = require('./routes/allProductsRoute');
const productDetailRoute = require('./routes/productDetailRoute');

app.use(cors());
app.use(express.json());


app.use('/api/class', classRoutes);
app.use('/api/caro', caroRoute);
app.use('/api/hot', hotRoute);
app.use('/api/card', cardRoute);
app.use('/api/allProducts', allProductsRoute);
app.use('/api/products', productDetailRoute)

app.use('/images', express.static('images'));


app.listen(port, () => console.log(`Example app listening on port http://127.0.0.1:${port}`))