var http = require("http");

var express = require ("express");
var app = new express();
var mongoClient = require("mongodb").MongoClient;
var fs = require('fs');

var lineReader = require('line-reader');
var path = require('path');
var programmableWebDBUrl = 'mongodb://localhost:27017/programmableWebDB';

app.use(function(req, res, next){
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	res.setHeader('Access-Control-Expose-Headers','Content-Disposition');
    res.setHeader('Content-Type', 'application/json');
	next();
});

app.get('/findAPIs',function(req,res){
    var updatedYear = req.query.updatedYear;
    var protocols = req.query.protocols;
    var tags = req.query.tags;
    var category = req.query.category;
    var ratings = req.query.rating;
    var ratingOption = req.query.ratingOption;
    jsonObj = {};
    if((updatedYear == "" || updatedYear == undefined) && (ratingOption == "" || ratingOption == undefined) &&
        (protocols == "" || protocols == undefined) && (tags == "" || tags == undefined) && 
        (category == "" || category == undefined) && (ratings == "" || ratings == undefined)){
        jsonObj = {};
    }
    else{
        if(protocols != ""){
            jsonObj['protocols']= {'$regex' : protocols, '$options' : 'i'};
        }
        if(tags != ""){
            var findTags = [];
            var tagsArray = tags.toString().split(" ");
            var arrayLen = tagsArray.length;
            for(var index = 0;index < arrayLen; index++){
                findTags.push(new RegExp(tagsArray[index], 'i'));
            }
            jsonObj['tags']= {'$all' : findTags};
        }
        if(category != ""){
            jsonObj['category']= {'$regex' : '^'+category+'$', '$options' : 'i'};
        }
        if(ratings != ""){
            if(ratingOption == "Less Than"){
                jsonObj['rating']= {$ne: "", $lt : ratings};
            }
            if(ratingOption == "Equal To"){
                jsonObj['rating']= {$ne: "", $eq : ratings};
            }
            if(ratingOption == "Greater Than"){
                jsonObj['rating']= {$ne:"", $gt : ratings};
            }
        }
        if(updatedYear != ""){
            var updatedYearInt = parseInt(updatedYear, 10);
            var nextYear = updatedYearInt + 1;
            var updatedYearString = updatedYearInt+"-01-01T00:00:00Z";
            var nextYearString = nextYear+"-01-01T00:00:00Z";
            jsonObj['updated'] = {$gte : updatedYearString, $lt : nextYearString};
        }
    }
    mongoClient.connect(programmableWebDBUrl, function(err, db){
        db.collection('apiDB', function(err, collection){
            collection.find(jsonObj).toArray(function(err, items){
                if(err) throw (err);
                console.log(items.length);
                // console.log(JSON.stringify(items));
                res.json(items);
            });
        });
    });
});

app.get('/findMashups', function(req, res){
    var updatedYear = req.query.updatedYear;
    var usedAPIs = req.query.usedAPIs;
    var tags = req.query.tags;
    jsonObj = {};
    if((updatedYear == "" || updatedYear == undefined) && (usedAPIs == "" || usedAPIs == undefined) &&
        (tags == "" || tags == undefined)){
        jsonObj = {};
    }
    else{
        if(tags != ""){
            var findTags = [];
            var tagsArray = tags.toString().split(" ");
            var arrayLen = tagsArray.length;
            for(var index = 0;index < arrayLen; index++){
                findTags.push(new RegExp(tagsArray[index], 'i'));
            }
            jsonObj['tags']= {'$all' : findTags};
        }
        if(updatedYear != ""){
            var updatedYearInt = parseInt(updatedYear, 10);
            var nextYear = updatedYearInt + 1;
            var updatedYearString = updatedYearInt+"-01-01T00:00:00Z";
            var nextYearString = nextYear+"-01-01T00:00:00Z";
            jsonObj['updated'] = {$gte : updatedYearString, $lt : nextYearString};
        }
        if(usedAPIs != ""){
            var findUsedAPIs = [];
            var usedAPIArray = usedAPIs.toString().split(" ");
            var arrayLen = usedAPIArray.length;
            for(var index = 0;index < arrayLen; index++){
                findUsedAPIs.push(new RegExp(usedAPIArray[index], 'i'));
            }
            console.log(findUsedAPIs);
            jsonObj['apis.name']= {'$all' : findUsedAPIs};
        }
    }
    mongoClient.connect(programmableWebDBUrl, function(err, db){
        db.collection('mashupDB', function(err, collection){
            collection.find(jsonObj).toArray(function(err, items){
                if(err) throw (err);
                console.log(items.length);
                res.json(items);
            });
        });
    });
});

app.get('/findKeywords', function(req, res){
    var keyword = req.query.keyword;
    // var keyword = "google books";
    jsonArray = [];
    jsonArray.push({"name" : new RegExp(keyword, 'i')});
    jsonArray.push({"summary" : new RegExp(keyword, 'i')});
    jsonArray.push({"description" : new RegExp(keyword, 'i')});
    mongoClient.connect(programmableWebDBUrl, function(err, db){
        db.collection('mashupDB', function(err, collection){
            collection.find({$or : jsonArray}).toArray(function(err, items){
                if(err) throw (err);
                console.log(items.length);
                var combinedItems = items;
                db.collection('apiDB', function(err, collection1){
                    collection1.find({$or : jsonArray}).toArray(function(err, items1){
                        if(err) throw (err);
                        console.log(items1.length);
                        combinedItems = combinedItems.concat(items1);
                        res.json(combinedItems);
                    });
                });
            });
        });
    });
});

http.createServer(app).listen(9091,function() {
    console.log('server running');
});

console.log('Server running at http://localhost:9091');