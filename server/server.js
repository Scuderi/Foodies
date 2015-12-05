var http = require('http');
var request = require('request');
var apiKey = require('./api.json');

function onRequest(req, res){
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');
  if ( req.method === 'OPTIONS' ) {
    res.writeHead(200);
    res.end();
    return;
  }
  req.url = req.url.substring(1);
  var url = 'http://food2fork.com/api/get?key=' + apiKey.key + '&rId=' + req.url;

  if (url.indexOf('search') < 0){

  }else{
    url = 'http://food2fork.com/api/search?key=' + apiKey.key + '&q=chicken';
  }
  console.log(req.url);
  console.log(url);
  request.get(url).pipe(res);
}

http.createServer(onRequest).listen(3003);
console.log("Server listening on port : 3003");
