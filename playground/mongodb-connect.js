// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/CoachingBuddy2', (error, db) => {
  if(error){
    console.log('Unable to connect to Mongodb server!');
    return;
  }

  console.log('Connected to Mongodb server!');
  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, res) => {
  //   if(err){
  //     console.log('Unable to insert todo', err);
  //     return;
  //   }
  //
  //   console.log(JSON.stringify(res.ops, undefined, 2));
  // });

  db.collection('Users').insertOne({
    name: 'nour',
    age: 22,
    location: 'cairo'
  }, (err, res) => {
    if(err){
      console.log('Unable to insert to Users collection!', err);
      return;
    }
    console.log('Inserted to Users collection suuccessfully!');
    console.log(JSON.stringify(res.ops, undefined, 2));
  });

  db.close();
});
