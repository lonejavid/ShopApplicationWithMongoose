const mongodb=require('mongodb');
const MongoCleint=mongodb.MongoClient;
let _db;

const mongoConnect=(callback)=>{
    MongoCleint.connect('mongodb+srv://lonejavid:0123.qwe.@cluster0.mlw1j2c.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0')
    .then(
        client=>{
            console.log("connected",client)
            _db=client.db()
            callback()
        }
    ).catch(err=>{
        console.log("this is the error message ",err)
    })


}

const getDb=()=>{
    if(_db){
        return _db
    }
    throw "no database found"
}

exports.mongoConnect=mongoConnect;
exports.getDb=getDb



