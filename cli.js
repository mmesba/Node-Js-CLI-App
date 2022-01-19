/*
 * Title: CLI file
 * Description: CLI related function to build cli app
 * Author: Mohammad Mesbaul Haque
 * Github link: https://github.com/mmesba
 * Date: 20/01/2022
 */
 
// Dependencies.
 const readline = require('readline'); 
const util = require('util');
let debug = util.debuglog('cli');
const events = require('events');

// Extend the event class
// This is the node recommended way to interact with event class
class _events extends events{}
let e = new _events();
 
// App object or Module scaffolding.
const cli = {} 
// main functions or objects.
 
//  Init Script
 cli.init = ()=>{
    // Send the start message to the console , in dark blue
    console.log('\x1b[34m%s\x1b', 'The CLI is running');

    // Start the interface
    let _interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '>'
    })

    // Create an initial prompt
    _interface.prompt();

}
 
// export the module.
 module.exports = cli;