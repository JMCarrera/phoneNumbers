var express = require('express');
var router = express.Router();

var csv = require("fast-csv");
var claves = {};

function createKeys(req) {
	csv
	 .fromPath("public/claves.csv")
	 .on("data", function(data){
	 	 
		 claves[data[2]] = data[1];
		 console.log("Normal: " +claves[data[2]]);	

	 })
	 .on("end", function(){

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
	  	
		var phoneNumber = adjustPhone(data[0], data);

		phoneNumber = "" + phoneNumber;	
		data[0] =  phoneNumber;
		saveRegister(collection, data);
	 })
	 .on("end", function(){
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
			        }
			        else {
			        	console.log("Se inserto correctamente");
			        }
			    });
			}	
}

function cleanData(mArr){
	if(!isNaN(mArr)){
		return Number(mArr);
	} else {
		
		return removeCharacters(mArr);
	}
}

function removeCharacters(value){
	value = value.replace(/[^0-9]/g, ""); 
	return  value;
}

function adjustPhone(value, data){
	value = cleanData(value);
	if (value != "") {
		value = value + "";
		if(value.length == 8){	
			value = "55" + value;
		}

		if(value.length > 8){
			value = cleanCellPhone(value, data);
		}

		if(value.length < 10){
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
	}
	data[1] = lada;
	return estado;
}

function cleanCellPhone(value, data){
		var lada = value.slice(0, 3) + "";
		if(lada  == "044"){
			value = value.slice(3, 13);
			data[2] = obtainState(value, data);
		} else {
			value = value.slice(0, 10);
			data[2] = obtainState(value, data);
		}
		return value;
}


router.get('/', function(req, res, next) {
	createKeys(req);
  	res.render('load', { title: 'Loading Data' });
});

module.exports = router;