var express = require('express');
var router = express.Router();

var csv = require("fast-csv");

/* GET home page. */
router.get('/', function(req, res, next) {

    var db = req.db;
    var collection = db.get('phoneNumbers');

  //getMethods(collection);

  collection.col.aggregate(
    [
      { "$group": {
        _id: "$state",
        total: {$sum:1}
      }},
      {
        "$sort":
        {
          total:-1
        }
      }
    ],
    function(err,result) {

      createKeys(res, result);

      //console.log( JSON.stringify( result, undefined, 4 ) );
      
    }
  );
});

function getMethods(obj)
{
    var res = [];
    for(var m in obj) {
        if(typeof obj[m] == "function") {
          console.log("FUNC; " + m);
        }
    }
}

function createKeys(res, states) {
  var obj = {};
  csv
   .fromPath("public/inegi.csv")
   .on("data", function(data){
    var mInfo = {};
    mInfo.pib = data[1];
    mInfo.pt = data[2];
    obj[data[0] + ""] = mInfo;
     
     console.log("DATA: " + JSON.stringify(obj[data[0]]) + ""); 
    // claves[data[2]] = data[1];
     //console.log("Normal: " +claves[data[2]]);
     console.log("DATA: " + data);  

   })
   .on("end", function(){
    // console.log("FINAL: "  + JSON.stringify(obj));
    for (var prop in states) {
      console.log("Estado: " + states[prop]._id);
      if(obj[states[prop]._id]){
        states[prop].pib = obj[states[prop]._id].pib;
        states[prop].pt = obj[states[prop]._id].pt;
      } else {
        states[prop].pib = 0;
        states[prop].pt = 0;
      }
      
      //prop.pbi =        
    } 
     console.log("FINAL: "  + JSON.stringify(states));

  res.render('index', {
        registers : JSON.stringify(states)
    });
    //console.log("FINAL: "  + JSON.stringify(states));
   
    /*for (var prop in claves) {
      console.log("ARR: " +prop + " DESC: " + claves[prop]);
    } */
       console.log("done");

      // insertDataBase(req);
   });
}

module.exports = router;