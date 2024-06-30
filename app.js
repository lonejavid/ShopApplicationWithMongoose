const path = require('path');
const express=require('express')

const mongoConnect=require('./util/database').mongoConnect;

const bodyParser = require('body-parser');

// const errorController = require('./controllers/error');
// const sequelize= require('./util/database')

const app = express();

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'public', 'views'));

 const adminRoutes = require('./routes/admin');
 const shopRoutes = require('./routes/shop');
// const cartRoutes=require('./routes/cart',)
const User=require('./models/user')
// const Product=require('./models/product');
// const User=require('./models/user');
const { name } = require('ejs');
// const Cart = require('./models/cart');
// const CartItem=require('./models/CartItem')


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));



app.use((req,res,next)=>{
    
    User.findById('66816fb8b1e71d92cf4cbf45').then(user=>{
        req.user=user;
        next();
        
       
          }).catch(err=>console.log(err));
       
})
app.use('/admin', adminRoutes);
 app.use(shopRoutes);

// app.use(errorController.get404);

// Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'});
// User.hasMany(Product);
// User.hasOne(Cart);
// Cart.belongsTo(User);
// Cart.belongsToMany(Product,{through:CartItem});
// Product.belongsToMany(Cart,{through:CartItem});


  mongoConnect(()=>{
    
    app.listen(3000);
  });