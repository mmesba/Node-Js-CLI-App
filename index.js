/*
 * Title: Primary File for the CLI App
 * Description: Index or Primary file for cli app
 * Author: Mohammad Mesbaul Haque
 * Github link: https://github.com/mmesba
 * Date: 20/01/2022
 */
 
// Dependencies.
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { StringDecoder } = require('string_decoder');

 
 
// App object or Module scaffolding.
const server = {}; 
// main functions or objects.
//  Creating http server
server.createHttpServer = ()=>{
    const createHttpServerVariable = http.createServer(server.handleReqRes);
    createHttpServerVariable.listen(3000, ()=>{
        console.log('\x1b[33m%s\x1b' ,`Listening on port 3000`);
    })
}
 
// Defining handle req res function
 server.handleReqRes = (req, res)=>{
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObject = parsedUrl.query;
    const headersObject = req.headers;

    res.setHeader('Content-Type', 'Application/json')
    // res.writeHead(statusCode)
    res.write('ok')
    console.log('\x1b[34m%s\x1b', 'pinging...');
    res.end();
 }
 
 server.createHttpServer();
// export the module.
 module.exports = server;