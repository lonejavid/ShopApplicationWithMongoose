const Product = require('../models/product');

const Order=require('../models/order')
exports.getProducts = (req, res, next) => {
  Product.find().then(products=>{
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
 })
}).catch(err=>{console.log(err)
});
}
 
    






exports.getIndex = (req, res, next) => {
  Product.find().then(products=>{
    res.render('shop/index', {
      prods: products,
      pageTitle:'shop',
      path:'/'
 })
}).catch(err=>{console.log(err)
});
}


exports.postCartDelete=(req,res)=>{
  const prodId=req.body.productId;
  console.log(prodId)
  req.user.removeFromCart(prodId).then(result=>{
    res.redirect('/cart')

  }).catch(err=>console.log(err))
  
   

}
  exports.getCart = (req, res, next) => {
  
  console.log("get cart called here for user  ",req.user)
  //console.log(req.user.Cart)
    req.user.populate('cart.items.productId').then(user=>{
      const products=user.cart.items
      console.log(user.cart.items)
    res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart',
    products:products


    });

  }).catch(err=>console.log(err))
  
  
};


exports.postCart=(req,res)=>{ 
  const prodId=req.body.productId;
  Product.findById(prodId).then(product=>{
    return req.user.addToCart(product)
  }).then(result=>{
    console.log(result);
    res.redirect('/cart')
  })

}



exports.postOrder = (req, res, next) => {

  req.user.populate('cart.items.productId')
    .then(user => {
      const products = user.cart.items.map(i=> {
         return {quantity: i.quantity,product:{...i.productId._doc}}
      })
      //   product: {
      //     _id: item.productId._id,  // Assuming productId has _id field
      //     name: item.productId.name  
      //   }
      // });

      // console.log(req.user)

      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user._id  // Assuming _id is the ObjectId of the user
        },
        products: products,
        userId: req.user._id 
      });
      console.log("this order is to be saved to the database ",order)
      console.log("the user is",req.user)

      return order.save();
    })
    .then(result => {
      return  req.user.clearCart()
      
    }).then(()=>{
      res.redirect('/orders');
    })
    .catch(err => {
      console.error('Error creating order:', err);
      next(err);  // Pass error to error handling middleware
    });
};


exports.getOrders = (req, res, next) => {
  req.user.getOrders()
      .then(orders => {
        console.log("orders are",orders)
          res.render('shop/orders', {
              path: '/orders',
              pageTitle: 'Your Orders',
              orders: orders
          });
      })
      .catch(err => {
          console.error('Error fetching orders:', err);
          next(err);  // Pass error to error handling middleware
      });
};

exports.getProduct=(req,res)=>{
        const prodId=req.params.productId;

        Product.findById(prodId).then(product=>{
          
            res.render('shop/prodect-details',{
            product:product,
            pageTitle:product.title,
            path: '/products'})
          

        }).catch(err=>console.log(err))
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
