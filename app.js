const path = require('path');
const express=require('express')

const mongoose=require('mongoose')

const bodyParser = require('body-parser');

// const errorController = require('./controllers/error');
// const sequelize= require('./util/database')

const app = express();

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'public', 'views'));

 const adminRoutes = require('./routes/admin');
 const shopRoutes = require('./routes/shop');
//const User=require('./models/user')
// const Product=require('./models/product');
// const User=require('./models/user');
const { name } = require('ejs');
// const Cart = require('./models/cart');
// const CartItem=require('./models/CartItem')


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));



// app.use((req,res,next)=>{
    
//     User.findById('66816fb8b1e71d92cf4cbf45').then(user=>{
//         req.user=new User(user.name,user.email,user.cart,user._id)
//         next();
        
       
//           }).catch(err=>console.log(err));
       
// })
app.use('/admin', adminRoutes);
 app.use(shopRoutes);

// app.use(errorController.get404);

// Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'});
// User.hasMany(Product);
// User.hasOne(Cart);
// Cart.belongsTo(User);
// Cart.belongsToMany(Product,{through:CartItem});
// Product.belongsToMany(Cart,{through:CartItem});

mongoose.connect('mongodb+srv://lonejavid:0123.qwe.@cluster0.mlw1j2c.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0').
then(result=>{
  app.listen(3000)
  console.log("cnooected to mongodb")
}).catch(err=>{
  console.log(err)
})