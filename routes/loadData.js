var express = require('express');
var router = express.Router();

/* GET users listing. */var csv = require("fast-csv");
var claves = {};

function createKeys(req) {
	csv
	 .fromPath("public/claves.csv")
	 .on("data", function(data){
	 	 //console.log("Normal: " + data[0]);
	 	 
		 claves[data[2]] = data[1];
		 console.log("Normal: " +claves[data[2]]);	

	 	 //console.log("Number: " + Number(data[0]));
	     //console.log("Replace: " + data[0].replace(/[^0-9]/g, ""));
	 })
	 .on("end", function(){
	 	 //console.log("ARR: " +obj);

	 	for (var prop in claves) {
	 		console.log("ARR: " +prop + " DESC: " + claves[prop]);
	 	}	
	     console.log("done");

	     insertDataBase(req);
	 });
}

function insertDataBase(req){
	var db = req.db;

	var collection = db.get('phoneNumbers');

	csv
	 .fromPath("public/test.csv")
	 .on("data", function(data){
	 	 //console.log("Normal: " + data[0]);
	 	 
		 //obj[data[2]] = data[1];
		 //console.log("Normal: " +obj[data[2]]);	
	 	 //console.log("Number: " + Number(data[0]));
	     //console.log("Replace: " + data[0].replace(/[^0-9]/g, ""));
	  	
		var phoneNumber = adjustPhone(data[0], data);

		phoneNumber = "" + phoneNumber;	
		data[0] =  phoneNumber;
		saveRegister(collection, data);

		//var lada = phoneNumber.slice(0,3);

		//var estado = obtainState(phoneNumber);

		/*console.log("Value: " + 
			phoneNumber + 
			" lada: " + 
			data[1] + 
			" Estado : " 
			+ data[2]);*/
	  	//console.log("Cleaned: " + adjustPhone(data[0]));
	    
	 })
	 .on("end", function(){
	 	 //console.log("ARR: " +obj);

	 	/*for (var prop in obj) {
	 		console.log("ARR: " +prop + " DESC: " + obj[prop]);
	 	}*/	
	     console.log("done");


	 });

}

function saveRegister(collection, data){
			if (isNaN(data[2]) && data[2] != null) {
				collection.insert({
			        "phoneNumber" : data[0],
			        "lada" : data[1],
			        "state" : data[2]
			        
			    }, function (err, doc) {
			        if (err) {
			        	console.log("No se pudo insertar");
			            // If it failed, return error
			            //.send("There was a problem adding the information to the database.");
			        }
			        else {
			        	console.log("Se inserto correctamente");
			            // And forward to success page
			            //res.redirect("userlist");
			        }
			    });
			}	
}

function cleanData(mArr){
	//console.log("VALOR: " + mArr);
	if(!isNaN(mArr)){
		return Number(mArr);
	} else {
		
		return removeCharacters(mArr);
	}
}

function removeCharacters(value){
	value = value.replace(/[^0-9]/g, ""); 
	//console.log("VALOR: " + value);
	return  value;
}

function adjustPhone(value, data){
	value = cleanData(value);
	if (value != "") {

		value = value + "";
		//console.log("!= : " + value.length);
		if(value.length == 8){	
			value = "55" + value;
		//	console.log("lenght: 8 value: " + value);
		}

		if(value.length > 8){
		//	console.log("lenght: > value: " + value);
		//	value = value.slice(0, 10);
		value = cleanCellPhone(value, data);
		//	console.log("value: " + value);
		}

		if(value.length < 10){
		//	console.log("null: " + value);
		}
	}
	return value;
}

function obtainState(value, data){
	var lada = value.slice(0,3);

	var estado = claves[lada];
	//if(isNaN(estado)){
	if (typeof estado == 'undefined'){
		 lada =	lada.slice(0, 2)
		 estado = claves[lada];
		 console.log("undefined: " + estado);
		 /*if(lada.slice(0, 2) == 55lada){
		 	estado = "CDMX";
		}

		if(lada.slice(0, 2) == 33){
		 	estado = "Jalisco";
		}

		if(lada.slice(0, 2) == 81){
		 	estado = "Nuevo León";
		}*/
	}
	data[1] = lada;
	//}
	return estado;
}

function cleanCellPhone(value, data){
		var lada = value.slice(0, 3) + "";
		//console.log("LADA: " + lada);

		if(lada  == "044"){
		//	console.log("LADA: cel");
			value = value.slice(3, 13);
			//data[1] = value.slice(0,3);
			data[2] = obtainState(value, data);
		} else {
		//	console.log("LADA: Normal");
			value = value.slice(0, 10);
			//data[1] = value.slice(0,3);
			data[2] = obtainState(value, data);
		}
		return value;
}

var csv = require("fast-csv");
var claves = {};

function createKeys(req) {
	csv
	 .fromPath("public/claves.csv")
	 .on("data", function(data){
	 	 //console.log("Normal: " + data[0]);
	 	 
		 claves[data[2]] = data[1];
		 console.log("Normal: " +claves[data[2]]);	

	 	 //console.log("Number: " + Number(data[0]));
	     //console.log("Replace: " + data[0].replace(/[^0-9]/g, ""));
	 })
	 .on("end", function(){
	 	 //console.log("ARR: " +obj);

	 	for (var prop in claves) {
	 		console.log("ARR: " +prop + " DESC: " + claves[prop]);
	 	}	
	     console.log("done");

	     insertDataBase(req);
	 });
}

function insertDataBase(req){
	var db = req.db;

	var collection = db.get('phoneNumbers');

	csv
	 .fromPath("public/test.csv")
	 .on("data", function(data){
	 	 //console.log("Normal: " + data[0]);
	 	 
		 //obj[data[2]] = data[1];
		 //console.log("Normal: " +obj[data[2]]);	
	 	 //console.log("Number: " + Number(data[0]));
	     //console.log("Replace: " + data[0].replace(/[^0-9]/g, ""));
	  	
		var phoneNumber = adjustPhone(data[0], data);

		phoneNumber = "" + phoneNumber;	
		data[0] =  phoneNumber;
		saveRegister(collection, data);

		//var lada = phoneNumber.slice(0,3);

		//var estado = obtainState(phoneNumber);

		/*console.log("Value: " + 
			phoneNumber + 
			" lada: " + 
			data[1] + 
			" Estado : " 
			+ data[2]);*/
	  	//console.log("Cleaned: " + adjustPhone(data[0]));
	    
	 })
	 .on("end", function(){
	 	 //console.log("ARR: " +obj);

	 	/*for (var prop in obj) {
	 		console.log("ARR: " +prop + " DESC: " + obj[prop]);
	 	}*/	
	     console.log("done");


	 });

}

function saveRegister(collection, data){
			if (isNaN(data[2]) && data[2] != null) {
				collection.insert({
			        "phoneNumber" : data[0],
			        "lada" : data[1],
			        "state" : data[2]
			        
			    }, function (err, doc) {
			        if (err) {
			        	console.log("No se pudo insertar");
			            // If it failed, return error
			            //.send("There was a problem adding the information to the database.");
			        }
			        else {
			        	console.log("Se inserto correctamente");
			            // And forward to success page
			            //res.redirect("userlist");
			        }
			    });
			}	
}

function cleanData(mArr){
	//console.log("VALOR: " + mArr);
	if(!isNaN(mArr)){
		return Number(mArr);
	} else {
		
		return removeCharacters(mArr);
	}
}

function removeCharacters(value){
	value = value.replace(/[^0-9]/g, ""); 
	//console.log("VALOR: " + value);
	return  value;
}

function adjustPhone(value, data){
	value = cleanData(value);
	if (value != "") {

		value = value + "";
		//console.log("!= : " + value.length);
		if(value.length == 8){	
			value = "55" + value;
		//	console.log("lenght: 8 value: " + value);
		}

		if(value.length > 8){
		//	console.log("lenght: > value: " + value);
		//	value = value.slice(0, 10);
		value = cleanCellPhone(value, data);
		//	console.log("value: " + value);
		}

		if(value.length < 10){
		//	console.log("null: " + value);
		}
	}
	return value;
}

function obtainState(value, data){
	var lada = value.slice(0,3);

	var estado = claves[lada];
	//if(isNaN(estado)){
	if (typeof estado == 'undefined'){
		 lada =	lada.slice(0, 2)
		 estado = claves[lada];
		 console.log("undefined: " + estado);
		 /*if(lada.slice(0, 2) == 55lada){
		 	estado = "CDMX";
		}

		if(lada.slice(0, 2) == 33){
		 	estado = "Jalisco";
		}

		if(lada.slice(0, 2) == 81){
		 	estado = "Nuevo León";
		}*/
	}
	data[1] = lada;
	//}
	return estado;
}

function cleanCellPhone(value, data){
		var lada = value.slice(0, 3) + "";
		//console.log("LADA: " + lada);

		if(lada  == "044"){
		//	console.log("LADA: cel");
			value = value.slice(3, 13);
			//data[1] = value.slice(0,3);
			data[2] = obtainState(value, data);
		} else {
		//	console.log("LADA: Normal");
			value = value.slice(0, 10);
			//data[1] = value.slice(0,3);
			data[2] = obtainState(value, data);
		}
		return value;
}

router.get('/', function(req, res, next) {
	createKeys(req);
  	res.render('load', { title: 'Loading Data' });
});

module.exports = router;