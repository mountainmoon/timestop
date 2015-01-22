# timestop
Pause setTimeout if needed.

It maybe useful in such situation that you want pause 'setTimeout' to prevent some timeouts caused by 'setTimeout' while you are checking breakpoints in your debugging time.

## Usage
    // Require it in Node.js or include it with <script src='timestop.js'> in
    // browsers before any 'setTimeout' you want to be affected.

    // in Node.js (it will attach 'timestop' object to window if in browsers)
    var timestop = require('timestop')

    var start = new Date;
    setTimeout(function() {
      console.log(new Date - start) // should be about 1500
    }, 1000)

    // all the affected 'setTimeout' will be paused
    timestop.pause()

    // .. assume 500ms elapsed.
    // all the affected 'setTimeout' will be resumed.
    timestop.resume()