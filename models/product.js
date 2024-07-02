const { default: mongoose } = require("mongoose");

const Schema=mongoose.Schema;
const productSchema=new Schema({
  title:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  imageUrl:{
    type:String,
    required:true
  }
});

module.exports=mongoose.model('Product',productSchema)




// class Product {
//   constructor(title, price, imageUrl, description, id,userId) {
//     this.title = title;
//     this.price = price;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this._id = id ? new mongodb.ObjectId(id) : null;
//     this.userId=userId
//   }

//   save() {
//     const db = getDb();
//     let dbOp;
//     if (this._id) {
//       dbOp = db.collection('products').updateOne({ _id: this._id }, { $set: this });
//     } else {
//       dbOp = db.collection('products').insertOne(this);
//     }
//     return dbOp
//       .then(result => {
//         console.log(result);
//         return result;
//       })
//       .catch(err => {
//         console.log(err);
//         throw err; // Rethrow the error to handle it in the calling code
//       });
//   }


//   static fetchAll() {
//     const db = getDb(); // Fetch the database instance here
//     return db.collection('products')
//       .find()
//       .toArray()
//       .then(products => {
//         console.log(products);
//         return products;
//       })
//       .catch(error => {
//         console.log(error);
//         throw error; // Optionally re-throw the error to handle it in the calling code
//       });
//   }

//   static findById(prodId){
//     const db=getDb();
//     return db.collection('products').find({_id:new mongodb.ObjectId(prodId)}).next().then(product=>{
//       console.log(product);
//       return product;
//     }).catch(error=>{
//       console.log(error)
//     })
//   }

//   static deleteById(prodId){
//     const db=getDb();
//    return db.collection('products').deleteOne({_id:new mongodb.ObjectId(prodId)}).then(result=>{
//     console.log("deleted")
//    }).catch(error=>{
//     console.log(error)
//    })
//   }

// }

// module.exports = Product;
