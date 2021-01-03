/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
	AUTH_COGNITO567AC464_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const axios = require('axios')
// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});



app.get('/:location/today', function(req, res) {
    
        let location = "portugal";
 /*--------------get api key and the url of the  external api -------------------*/
        const API_KEY = process.env.API_KEY;
        //event of the day
        let todayEventsUrl = `http://api.eventful.com/json/events/search?app_key=${API_KEY}&location=${location}&date=Today`;
      
        if(req.apiGateway && req.apiGateway.event.pathParameters) {
           location = req.apiGateway.event.pathParameters.location
          todayEventsUrl = `http://api.eventful.com/json/events/search?app_key=${API_KEY}&location=${location}&date=Today`;
        }
       /* -------------get data of the external api---------*/
           axios.get(todayEventsUrl)
            .then((response) =>{ res.json({todayEvents: response.data}) })
            .catch(err => { res.json({error: err}) });
       
});



app.get('/:location/week', async function(req, res) {

        let location = "portugal";
 /*--------------get api key and the url of the  external api -------------------*/
        const API_KEY = process.env.API_KEY;
        //event of the day
         let weekEventsUrl = `http://api.eventful.com/json/events/search?app_key=${API_KEY}&location=${location}&date=this+week`;
         if(req.apiGateway && req.apiGateway.event.pathParameters) {
           
            location = req.apiGateway.event.pathParameters.location
            weekEventsUrl = `http://api.eventful.com/json/events/search?app_key=${API_KEY}&location=${location}&date=this+week`;
         }
       /* -------------get data of the external api---------*/
            axios.get(weekEventsUrl)
            .then((response) =>{ res.json({ weekEvents: response.data}) })
            .catch(err => { res.json({error: err}) });
        
});


app.get('/description/:eventName/:idEvent', function(req, res) {
    
  /*--------------get api key and the url of the  external api -------------------*/
        const API_KEY = process.env.API_KEY;
        //event of the day
        
        if(req.apiGateway && req.apiGateway.event.pathParameters) {
         
         let idEvent = req.apiGateway.event.pathParameters.idEvent
         let eventsInfoUrl =  `http://api.eventful.com/json/events/get?app_key=${API_KEY}&id=${idEvent}`;
       
       /* -------------get data of the external api---------*/
            axios.get(eventsInfoUrl)
            .then((response) =>{ res.json({ eventsInfo: response.data}) })
            .catch(err => { res.json({error: err}) });
        }
});


app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
