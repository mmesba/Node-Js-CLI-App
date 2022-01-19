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
 
// Input Processor
cli.processInput = (str)=>{
    str = typeof(str) == 'string' && str.trim().length > 0 ? str.trim() : false;
    // Only   process the input if the user actually wrote something otherwise ignore it
    if (str) {
        // Codify or systematize the unique strings that identify the unique questions to be asked
        let uniqueInputs = [
            'man',
            'help',
            'exit',
            'stats',
            'list users',
            'list user info',
            'list checks',
            'more check info',
            'list log',
            'more log info'
        ] 

        // Go through the possible inputs, emit an event when a match is found
        let matchFound =  false;
        let counter = 0;
        uniqueInputs.some((input)=>{
            if (str.toLowerCase().indexOf(input) > -1) {
                matchFound = true;
                // Emit an  event matching the unique input, and include the full string given by the user
                e.emit(input,str);
                return true; 
              } else {
                 
             }
        })

        // If no match is found, tell the user to try again
        if (!matchFound) {
            console.log('Sorry, try again');
        }

      } else {
         
     }

}



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

    // Handle each line of input separately
    _interface.on('line',(str)=>{
        // send to the input processor
        cli.processInput(str);

        // Reinitialize the prompt afterwards
        _interface.prompt();
    })

    // If the user stops the cli    , kill the associated process
    _interface.on('close', ()=>{
        process.exit(0);
    })

}
 
// export the module.
 module.exports = cli;