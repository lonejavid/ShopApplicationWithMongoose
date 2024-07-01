const Product = require('../models/product');
const mongodb=require('mongodb')
const ObjectId=mongodb.ObjectId;
exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    edit: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const prodId=req.body.productId
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = parseInt(req.body.price);
  const description = req.body.description;
 const product=new Product(title,price,imageUrl,description,null,req.user._id)
 product.save()
    .then(result => {
      console.log('Product inserted',result);
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        edit: editMode,
        product: product
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  
  
   const product=new Product(updatedTitle,updatedPrice,updatedImageUrl,updatedDesc,new ObjectId(prodId));

   product.save().then(result => {
      console.log('Product updated');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
      res.redirect('/admin/products');
    });
};

exports.postDelete = (req, res, next) => {
  const productId = req.body.productId;
  Product.deleteById(productId)
    .then(() => {
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err))
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => console.log(err));
};
