// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
  if(error){
    console.log('Unable to connect to Mongodb server!');
    return;
  }

  console.log('Connected to Mongodb server!');

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID("5b2eb49ba8ce07fe6f9dcd53")}, {
  //     $set: {
  //       completed: true
  //     }
  //   }, {
  //     returnOriginal: false
  //   }).then((res) => {
  //     console.log(res);
  //   });


  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID("5b2e7bc58da2f7439cbda5d2")}, {
      $set: {
        name: '7amada'
      },
      $inc: {
        age: 1 
      }
    }, {
      returnOriginal: false
    }).then((res) => {
      console.log(res);
    });

  // db.close();
});
