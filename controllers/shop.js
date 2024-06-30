const Product = require('../models/product');
const Cart=require('../models/cart')

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
  req.user.getCart().then(cart=>{
    return cart.getProducts({where:{id:prodId}})
  }).then(products=>{
    const product=products[0];
    return product.cartItem.destroy();
  }).then(result=>{
    res.redirect('/cart')

  }).catch(err=>console.log(err))
  Product.findByPk(prodId,prodect=>{
    Cart.deleteProduct(prodId,prodect.price);
   
  })
}
  
 


exports.getCart = (req, res, next) => {
  
  //console.log(req.user.Cart)
  req.user.getCart().then(cart=>{
    return cart.getProducts().then(products=>{
      res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart',
    products:products
  });

    });

  }).catch(err=>console.log(err))
  
  
};


exports.postCart=(req,res)=>{ 
  const prodId=req.body.productId;
  console.log(prodId)
  let fetchedCart;
  let newQuantity=1;
 req.user.getCart()
 .then(cart=>{
  fetchedCart=cart
  return cart.getProducts({where:{id:prodId}})

 }).then(products=>{
  let prodect;
  if(products.length>0){
    prodect=products[0];
  }
  
  if(prodect){
    const oldQuantity=prodect.cartItem.quantity;
    newQuantity=oldQuantity+1;
    return prodect;
  }
  return Product.findByPk(prodId)
}).then(prodect=>{
    return fetchedCart.addProduct(prodect,{
      through:{quantity:newQuantity}
    }).then(()=>{
      res.redirect('/cart')
    });

  
  return Product.findByPk(prodId).then(prodect=>{
    return fetchedCart.addProduct(prodect,{through:{quantity:newQuantity}})
    .then(data=>{
      return fetchedCart.addProduct(prodect,{
        through:{quantity:newQuantity}
      })
    }).then(()=>{
      res.redirect('/cart')
    });

  }).catch(err=>console.log(err));
 })
 .catch(err=>console.log(err))
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
