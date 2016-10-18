var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	//createKeys();
  	//res.render('index', { title: 'Express' });

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

	/*var arr = collection.aggregate([
		          {$match: {}}
		        , {$group:
		            {_id: '$state', total: {$sum: 1} }
		          }
		      ]);	*/
		

    /*collection.find({},{},function(e,docs){

    	console.log("ENCONTRO: " + docs[100].state);   
    	res.render('index', {
			registers : docs
		});
    });*/
});



function getMethods(obj)
{
    var res = [];
    for(var m in obj) {
        if(typeof obj[m] == "function") {
        	console.log("FUNC; " + m);
            //res.push(m)
        }
    }
    //return res;
}




module.exports = router;