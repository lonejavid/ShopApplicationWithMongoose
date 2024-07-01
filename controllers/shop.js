const Product = require('../models/product');


exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(products=>{
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
 })
}).catch(err=>{console.log(err)
});
}
 
    






exports.getIndex = (req, res, next) => {
  Product.fetchAll().then(products=>{
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
  req.user.deleteItemFromCart(prodId).then(result=>{
    res.redirect('/cart')

  }).catch(err=>console.log(err))
  
   

}
  
 


exports.getCart = (req, res, next) => {
  
  console.log("get cart called here for user  ",req.user)
  //console.log(req.user.Cart)
    req.user.getCart().then(products=>{
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



exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
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
