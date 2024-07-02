const path = require('path');
const express=require('express')

const mongoose=require('mongoose')

const bodyParser = require('body-parser');

// const errorController = require('./controllers/error');
// const sequelize= require('./util/database')

const app = express();

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'public', 'views'));


app.use((req,res,next)=>{
    
  User.findById('6683aee6f8b5275cf501b9a5').then(user=>{
      req.user=user
      next();
      
     
        }).catch(err=>console.log(err));
     
})

 const adminRoutes = require('./routes/admin');
 const shopRoutes = require('./routes/shop');
//const User=require('./models/user')
// const Product=require('./models/product');
 const User=require('./models/user');
const { name } = require('ejs');
// const Cart = require('./models/cart');
// const CartItem=require('./models/CartItem')


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));




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
  User.findOne({ _id: '6683aee6f8b5275cf501b9a5' }).then(user=>{
    if(!user){
      const user=new User({
        name:'lonejavid',
        email:'lonejavid0739@gmail.com',
        cart:{items:[]}
      });
      user.save()

    }
  })

  app.listen(3000)
  console.log("cnooected to mongodb")
}).catch(err=>{
  console.log(err)
})