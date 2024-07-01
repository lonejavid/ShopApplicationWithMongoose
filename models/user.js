const mongodb=require('mongodb')

const getDb = require('../util/database').getDb;

class User{
    constructor(nuserame,email,cart,id){
        this.name=nuserame;
        this.email=email;
        this.cart=cart;
        this._id=id
    }
    save(){
        const db = getDb();
        return db.collection('users').insertOne(this);
    
    
       

    }
    addToCart(product){
        // const cartProducts= this.cart.findIndex(cp=>{
        //     return cp._id === product._id
        // });
        const updatedCart={items:[{productId:new mongodb.ObjectId(product._id),quantity:1}]};
        const db=getDb();
       return db.collection('users').updateOne({_id:new mongodb.ObjectId(this._id)},{$set:{cart:updatedCart}})
        

    }
    static findById(userId){
        const db = getDb();
        return db.collection('users').findOne({_id:new mongodb.ObjectId(userId)})

    }
}
module.exports = User;