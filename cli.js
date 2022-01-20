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
 
// Input Handlers
e.on('man', (str)=>{
    cli.responders.help();
})

e.on('help', (str)=>{
    cli.responders.help();
})

e.on('exit', (str)=>{
    cli.responders.exit();
})

e.on('stats', (str)=>{
    cli.responders.stats();
})

e.on('list users', (str)=>{
    cli.responders.listUsers();
})

e.on('more user info', (str)=>{
    cli.responders.moreUserInfo(str);
})

e.on('list checks', (str)=>{
    cli.responders.listChecks(str);
})

e.on('more check info', (str)=>{
    cli.responders.moreCheckInfo(str);
})

e.on('list logs', (str)=>{
    cli.responders.listLogs();
})

e.on('more log info', (str)=>{
    cli.responders.moreLogInfo(str);
})


// Responders object
cli.responders = {};

// help/man
cli.responders.help = ()=>{
    console.log('You asked for help');
}

// Exit
cli.responders.exit = ()=>{
    // The process.exit() method instructs Node.js to terminate the process synchronously with an exit status of code. If code is omitted, exit uses either the 'success' code 0 or the value of process.exitCode if it has been set. Node.js will not terminate until all the 'exit' event listeners are called.

//     The shell that executed Node.js should see the exit code as 1.

// Calling process.exit() will force the process to exit as quickly as possible even if there are still asynchronous operations pending that have not yet completed fully, including I/O operations to process.stdout and process.stderr.

// Node.js to terminate the process synchronously with an exit status of code. If code is omitted, exit uses either the 'success' code 0 or the value of process.exitCode if it has been set. Node.js will not terminate until all the 'exit' event listeners are called.

    process.exit(0);
}

// Stats
cli.responders.stats = ()=>{
    console.log('You asked for stats');
}

// List users
cli.responders.listUsers = ()=>{
    console.log('You asked for list users');
}

// More user info
cli.responders.moreUserInfo = (str)=>{
    console.log('You asked for more user info', str);
}

// List checks
cli.responders.listChecks = (str)=>{
    console.log('You asked for list checks', str);
}

// More check info
cli.responders.moreCheckInfo = (str)=>{
    console.log('You asked for more check info', str);
}

// List logs
cli.responders.listLogs = ()=>{
    console.log('You asked for List logs');
}

// More log info
cli.responders.moreLogInfo = (str)=>{
    console.log('You asked for more log info', str);
}




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
            'more user info',
            'list checks',
            'more check info',
            'list logs',
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