const express = require('express');
const cors = require('cors'); 
const connection = require('./config.js');
const sellersRouter = require('./routes/seller-routes');
const customerRouter = require('./routes/customer-routes');
const bookRouter = require('./routes/book-routes');
const authRouter = require('./routes/auth-routes');
const orderRouter = require('./routes/order-routes.js');

const app = express();


//middleware
app.use(express.json());
app.use(cors());

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/books', bookRouter);
app.use('/api/v1/sellers', sellersRouter);
app.use('/api/v1/customers', customerRouter);
app.use('/api/v1/orders/', orderRouter);



app.listen(5000, () => {
    console.log('server started');
})