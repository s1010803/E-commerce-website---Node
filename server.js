const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const path = require('path');
const cors = require('cors');
const classRoutes = require('./routes/classRoutes');
const caroRoute = require('./routes/caro');
const hotRoute = require('./routes/hotRoute');
const cardRoute = require('./routes/productsCardRouter');
const allProductsRoute = require('./routes/allProductsRoute');
const productDetailRoute = require('./routes/productDetailRoute');
const authRoutes = require('./routes/authRoutes');

app.use(cors());
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, './images')));

app.use('/api/class', classRoutes);
app.use('/api/caro', caroRoute);
app.use('/api/hot', hotRoute);
app.use('/api/card', cardRoute);
app.use('/api/allProducts', allProductsRoute);
app.use('/api/products', productDetailRoute)
app.use('/auth', authRoutes)



app.listen(port, () => console.log(`Example app listening on port http://127.0.0.1:${port}`))