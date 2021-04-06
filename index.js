const express = require('express')
const cors = require('cors')
require('dotenv').config()
const ObjectId = require("mongodb").ObjectID
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://fruityUser:YeGjQlQ4FWCOw95l@cluster0.bejzy.mongodb.net/fruitydb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const app = express()
const port = 5000;
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})


client.connect(err => {
  const collection = client.db("fruitydb").collection("fruits");
  const userCollection = client.db("fruitydb").collection("ordered");

  // add fakedata to databasse
// app.post('/add',(req,res)=>{ 
//     const products = req.body
//    collection.insertMany(products)
//     .then(res=>console.log(res))
// })

app.get('/products',(req,res)=>{
 collection.find({})
  .toArray((err,document)=>{
      // console.log('one',document);
      res.send(document)
  })
})


app.get('/orderedProducts',(req,res)=>{
  console.log("hello user",req.query.email);
  
  userCollection.find({email:req.query.email})
   .toArray((err,document)=>{
       // console.log('one',document);
       res.send(document)
   })
  })

//  insert product in database
app.post('/addProduct',(req, res) =>{
const newProduct  = req.body;
collection.insertOne(newProduct)

})




app.post('/addProductUser',(req, res) =>{
  const newProduct  = req.body;
  userCollection.insertOne(newProduct)
  
  })

// delete a product
app.delete('/delet/:id',(req,res)=>{

collection.deleteOne({_id:objId(req.params.id)})
.then(res=>{
  console.log('two',res);
})
})




// app.post('/addToCart',(req, res) =>{
//   const newProduct  = req.body;
//   //collection.insertOne(newProduct)
//  console.log(newProduct);

app.post('/addToCart',(req,res)=>{
const product = req.body
userCollection.insertMany(product)
.then(res=>console.log( 'three',res.body))

})


app.get('/showProduct/:email',(req,res)=>{
userCollection.find({email:req.params.email})
.toArray((err,document)=>{
 console.log(document);
 res.send(document)

})
})
app.get('/fruits/:_id',(req,res)=>{
console.log("yes we got id from frontend",req.params._id); 
collection.find({_id: ObjectId(req.params._id)})
.toArray((err,document)=>{
 console.log(err,document);
 res.send(document)

})
})


  
});




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})