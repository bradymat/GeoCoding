require('dotenv').config();
var express = require('express');
var router = express.Router();
var request = require('superagent')

// var geocoding = new require('reverse-geocoding');
// var config = {
//   'latitude': -41.2941,
//   'longitude': 174.776
// };
var geocodeKey = process.env.GEOCODE_KEY
var geolcateKey = process.env.GEOLOCATE_KEY
/* GET home page. */

// Google maps geolocation api
router.get('/', function(req, res, next) {
  request
  .post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${geolcateKey}`)
  .end(function(err, resp){
    if(!err){
      console.log(resp.body.location.lat, resp.body.location.lng)
      var location = {
        lat: 40.714224,
        lng: -73.961452
      }
      request
      .get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${resp.body.location.lat},${resp.body.location.lng}&key=${geocodeKey}`)
      // .get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${geocodeKey}`)
      .end(function(err, resp){
        if(!err){
          // console.log(resp.body.results);
          // console.log(resp.body.results[0].address_components[1].long_name);
          console.log(resp.body.results[2].formatted_address);
          res.render('index', { address: resp.body.results[2].formatted_address, title: 'Sound Around' });
        }
        else{
          res.send(err)
        }
      })
    }
    else{
      res.send(err)
    }
  });


  // Google maps reverse geocoding api
  // router.get('/', function(req, res, next) {
  //   request
  //   .get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=-41.2941,174.776&key=${key}`)
  //   .end(function(err, resp){
  //     if(!err){
  //       console.log(Object.keys(resp.body.results))
  //       console.log(resp.body.results[0].address_components);
  //       res.render('index', { title: 'Express' });
  //     }
  //   });



  // geocoding.location(config, function (err, data){
  //   if(err){
  //     console.log(err);
  //   }else{
  //     console.log(Object.keys(data));
  //     res.render('index', { title: 'Express' });
  //   }
  // });
});

module.exports = router;
