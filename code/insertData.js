var http = require("http");

var express = require ("express");
var app = new express();
var mongoClient = require("mongodb").MongoClient;
var fs = require('fs');

var lineReader = require('line-reader');
var path = require('path');
var programmableWebDBUrl = 'mongodb://localhost:27017/programmableWebDB';
var apiFilename = path.join(__dirname, '/../files/api.txt');
var mashupFilename = path.join(__dirname, '/../files/mashup.txt');

mongoClient.connect(programmableWebDBUrl, function(err, db){
    console.log("Created api database");
    var apiCollection = db.collection('apiDB');

    var apiHeaders = ['id','title','summary','rating','name','label','author','description','type','downloads','useCount','sampleUrl',
    'downloadUrl','dateModified','remoteFeed','numComments','commentsUrl','tags','category','protocols','serviceEndpoint','version',
    'wsdl','dataFormats','apigroups','example','clientInstall','authentication','ssl','readonly','vendorApiKits','communityApiKits',
    'blog','forum','support','accountReq','commercial','provider','managedBy','nonCommercial','dataLicensing','fees','limits','terms',
    'company','updated'];

    lineReader.eachLine(apiFilename, function(currentLine, lastLine, callback){
        try{
            var splitLine = currentLine.split('$#$');
            var jsonObject = {};

            var multipleValueDelimiter = "###";
            
            for(var index = 0; index < splitLine.length; index++){
                var arrayObj = [];
                if(splitLine[index].indexOf(multipleValueDelimiter) !== -1){
                    var splitMultiple = splitLine[index].split('###');
                    for(var multipleValuesIndex = 0; multipleValuesIndex < splitMultiple.length; multipleValuesIndex++){
                        // if(apiHeaders[index] == "tags"){
                        //     arrayObj.push(splitMultiple[multipleValuesIndex].toLowerCase()); 
                        // }
                        // else{
                            arrayObj.push(splitMultiple[multipleValuesIndex]);
                        // }
                    }
                    jsonObject[apiHeaders[index]] = arrayObj;
                }
                else{
                    // if(apiHeaders[index] == "tags"){
                    //     jsonObject[apiHeaders[index]] = splitLine[index].toLowerCase();    
                    // }
                    // else{
                        jsonObject[apiHeaders[index]] = splitLine[index];
                    // }
                }
            }
            apiCollection.insert(jsonObject, function(insertError, insertObject){
                if(insertError){
                    console.log("Couldn't insert in the database");
                }
                if(lastLine){
                    console.log('Inserted all records in api db');
                }
                else{
                    callback();
                }
            });
        }catch(lineError){
            console.log("Error: " + lineError);
        }
    });
});

mongoClient.connect(programmableWebDBUrl, function(err, db){
    console.log("Created mashup database");

    var mashupCollection = db.collection('mashupDB');

    var mashupHeaders = ['id', 'title','summary','rating','name','label','author','description','type','downloads','useCount',
    'sampleUrl','dateModified','numComments','commentsUrl','tags','apis','updated'];
    lineReader.eachLine(mashupFilename, function(currentLine, lastLine, callback){
        try{
            var splitLine = currentLine.split('$#$');
            var jsonObject = {};

            var multipleValueDelimiter = "###";
            for(var index = 0; index < splitLine.length; index++){
                var arrayObj = [];
                if(splitLine[index].indexOf(multipleValueDelimiter) !== -1){
                    var splitMultiple = splitLine[index].split('###');
                    var splitAPIArray = [];
                    for(var multipleValuesIndex = 0; multipleValuesIndex < splitMultiple.length; multipleValuesIndex++){
                        if(splitMultiple[multipleValuesIndex].indexOf('$$$') !== -1){
                            var splitAPI = splitMultiple[multipleValuesIndex].split('$$$');
                            splitAPIArray.push({'name': splitAPI[0], 'url': splitAPI[1]});
                        }
                        else{
                            // if(mashupHeaders[index] == "tags"){
                            //     arrayObj.push(splitMultiple[multipleValuesIndex].toLowerCase());
                            // }
                            // else{
                                arrayObj.push(splitMultiple[multipleValuesIndex]);
                            // }
                        }
                    }
                    if(splitAPIArray.length > 0){
                        jsonObject[mashupHeaders[index]] = splitAPIArray;
                    }
                    else{
                        jsonObject[mashupHeaders[index]] = arrayObj;
                    }
                }
                else{
                    var splitAPIArray = [];
                    if(splitLine[index].indexOf('$$$') !== -1){
                        var splitAPI = splitLine[index].split('$$$');
                        splitAPIArray.push({'name': splitAPI[0], 'url': splitAPI[1]});
                        jsonObject[mashupHeaders[index]] = splitAPIArray;
                    }
                    else{
                        // if(mashupHeaders[index] == "tags"){
                        //     jsonObject[mashupHeaders[index]] = splitLine[index].toLowerCase();
                        // }
                        // else{
                            jsonObject[mashupHeaders[index]] = splitLine[index];
                        // }
                    }
                }
            }
            mashupCollection.insert(jsonObject, function(insertError, insertObject){
                if(insertError){
                    console.log(insertError);
                    console.log("Couldn't insert in the mashup database");
                }
                if(lastLine){
                    console.log('Inserted all records in mashup db');
                }
                else{
                    callback();
                }
            });
        }catch(lineError){
            console.log("Error: " + lineError);
        }
    });
});

mongoClient.connect(programmableWebDBUrl, function(err, db){
    console.log("Created Indexes");
    if(err) throw err;
    var apiCollection = db.collection('apiDB');
    var mashupCollection = db.collection('mashupDB');
    apiCollection.createIndex({"updated" : 1, "tags" : 1, "rating" : 1, "protocols" : 1, "category" : 1});
    mashupCollection.createIndex({"updated" : 1});
    mashupCollection.createIndex({"tags" : 1});
    mashupCollection.createIndex({"apis" : 1});
});