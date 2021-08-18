const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRouter = require('./routes/userRoutes.js');
const productRouter = require('./routes/productRoutes'); 

dotenv.config({ path: './config.env' });

/**
 * @DESC  Database Connection
 */
const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  })
  .then(() => console.log('DB connection successful!'))
  .catch((err) => {
    console.log('Error : ', err);
  });

const app = express();
//req.body parser
app.use(express.json());

/**
 * @USER_Routes
 *  POST    /api/users
 *  GET     /api/users
 *  GET     /api/users/:id
 *  PATCH   /api/users/:id
 *  DELETE  /api/users/:id
 */
app.use('/api/users', userRouter);


/**
 * @PRODUCTS_Routes
 *  POST    /api/products
 *  GET     /api/products
 *  GET     /api/products/:id
 *  PATCH   /api/products/:id
 *  DELETE  /api/products/:id
 */
app.use('/api/products',productRouter); 


app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
