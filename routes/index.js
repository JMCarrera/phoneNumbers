var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    var db = req.db;
    var collection = db.get('phoneNumbers');

  getMethods(collection);

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
      console.log( JSON.stringify( result, undefined, 4 ) );
      res.render('index', {
      registers : JSON.stringify(result)
    });
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

module.exports = router;