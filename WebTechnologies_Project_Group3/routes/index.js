var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var ObjectId = require('mongodb').ObjectId
var MongoClient= require('mongodb').MongoClient
//connect to MONGODB  ATLAS
//mongodb+srv://my_db:abhayDB@clusterfirst.797wd.mongodb.net/WebProject_Group3?retryWrites=true&w=majority
MongoClient.connect('mongodb+srv://my_db:abhayDB@clusterfirst.797wd.mongodb.net/my_db?retryWrites=true&w=majority',function(err,client){
  if(err) throw err
  var db= client.db('WebProject_Group3')


/* GET home page. */
router.get('/', function(req, res, next) {                        
  res.render('index', { title: 'Airline Reservation System' });   //gathering data
});

/* Flight Booking*/
router.get('/bookflight', function(req, res, next) {
  //alert("kindly go to view flight after booking your flight to find your ticket number");
  res.render('bookflight', { title: 'Booking flight'});
});
router.get('/sample', function(req, res, next) {
  res.render('sample', { title: 'Booking flight'});
});
router.get('/delete', function(req, res, next) {
  res.render('delete', { title: 'Booking flight'});
});
/*router.get('/changeflight', function(req, res, next) {
  res.render('changeflight', { title: 'changeflight flight'});
});
*/
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'thirdgroup3rd@gmail.com',
    pass: 'group@3rd'
  }
});


/*Post */
router.post("/save", function(req, res, next)
{//alert("kindly go to view flight after booking your flight to find your ticket number");
  db.collection('flight').insertOne(req.body);
  var mailOptions = {
    from: 'thirdgroup3rd@gmail.com',
    to: req.body.user_email,
    subject: 'Congratulations, flight booked',
    text: 'you will recieve mail containg ticket number with '+req.body.user_airline+ ' shortly'
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  res.redirect('/bookflight');
});

/* View flight page. */
router.get('/viewflight', function(req, res, next) {
  db.collection('flight').find().toArray(function (err, flight) {
    if (err) throw err
    res.render('viewflight', { title: 'View flight',list:flight });
  });
});

/*res flight
router.get('/resViewflight', function(req, res, next) {
  res.render('resViewflight', { title: 'Response view flight'});
});
*/

/*Post */


/* Change flight
router.post("/changeflight/:id", function(req, res, next){
  db.collection('flight').findOne({_id:ObjectId(req.params.id)}, function (err, flight ){
    if (err) throw err 
    res.render('changeflight', { title: 'Change flight',flight:flight});
  });
});*/
router.get("/changeflight/:id", function(req, res, next){
  db.collection('flight').findOne({_id:ObjectId(req.params.id)}, function (err, flight ){
    if (err) throw err 
    res.render('changeflight', { title: 'Change flight',flight:flight});
  });
});

/*Updating*/
router.post("/updateflight/:id", function(req, res, next){
  db.collection('flight').findOneAndUpdate(
    {_id:ObjectId(req.params.id)},
       {
        $set: req.body
      
  }, function (err, abhay1) {
    if (err) throw err
    res.redirect('/');
  });
});
router.post("/test", function(req, res, next)
{ var i=req.body.ticket_number
  db.collection('flight').findOne({_id:ObjectId(i)}, function (err, flight ){
    if (err) throw err 
    res.render('changeflight', { title: 'Change flight',flight:flight});
  
});
});
router.post("/dell", function(req, res, next)
{ var i=req.body.ticket_number
  db.collection('flight').deleteOne({_id:ObjectId(i)}, function (err, result) {
    if (err) throw err
 res.redirect('/');
  
});
});
/* Delete Create form  
router.get("/delete/:id", function(req, res, next){
  db.collection('flight').deleteOne({_id:ObjectId(req.params.id)}, function (err, result) {
    if (err) throw err
 res.redirect('/');
  });
});*/
});



module.exports = router;
