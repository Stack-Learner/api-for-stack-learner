const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRouter = require('./routes/userRoutes.js');
const profileRouter = require('./routes/profileRoutes'); 
const productRouter = require('./routes/productRoutes');
const bannerRouter = require('./routes/bannerRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const AppError = require('./utils/AppError');
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
app.get('/',(req,res,next)=> { 
  res.send("Perfectly serving the api"); 
})
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
 * @USERS_Profile_Routes
 *  POST    /api/profile
 *  GET     /api/profile
 *  GET     /api/profile/:id
 *  PATCH   /api/profile/:id
 *  DELETE  /api/profile/:id
 */
app.use('/api/profile',profileRouter); 

/**
 * @PRODUCTS_Routes
 *  POST    /api/products
 *  GET     /api/products
 *  GET     /api/products/:id
 *  PATCH   /api/products/:id
 *  DELETE  /api/products/:id
 */
app.use('/api/products', productRouter);

/**
 * @BANNER_Routes
 *  POST    /api/banner
 *  GET     /api/banner
 *  GET     /api/banner/:id
 *  PATCH   /api/banner/:id
 *  DELETE  /api/banner/:id
 */
app.use('/api/banners', bannerRouter);

/**
 * @category_Routes
 *  POST    /api/category
 *  GET     /api/category
 *  GET     /api/category/:id
 *  PATCH   /api/category/:id
 *  DELETE  /api/category/:id
 */
app.use('/api/category', categoryRouter);

/**
 * @review_Routes
 *  POST    /api/review
 *  GET     /api/review
 *  GET     /api/review/:id
 *  PATCH   /api/review/:id
 *  DELETE  /api/review/:id
 */
app.use('/api/review', reviewRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
