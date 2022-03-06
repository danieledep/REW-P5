// $ firmata-party uno --debug
// $ node server.js


// Setup basic express server + socket.io
let express = require('express');
let app = express();
let path = require('path');
let server = require('http').createServer(app);
let io = require('socket.io')(server);
let port = process.env.PORT || 3000;


server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname));


io.on('connection', (socket) => {
  console.log("server connected");
});


//ARDUINO CONTROL

const five = require("johnny-five");
const board = new five.Board();
let buttonPin1 = 8,
    buttonPin2 = 9,
    ledPin1 = 11,
    ledPin2 = 12,
    phInterPin1 = 4,
    phInterPin2 = 2;

let segTime1 = 0,
    segTime2 = 0;

board.on("ready", function() {

  const phInterrupter1 = new five.Button({
    pin: phInterPin1,
    isPullup: true
  });

  const phInterrupter2 = new five.Button({
    pin: phInterPin2,
    isPullup: true
  });

  const leftButton = new five.Button(buttonPin1);
  const rightButton = new five.Button(buttonPin2);
  const leftPin = new five.Led(ledPin1);
  const rightPin = new five.Led(ledPin2);

  // Inject the `button` hardware into
  // the Repl instance's context;
  // allows direct command line access
  board.repl.inject({
    phInterrupter1: phInterrupter1,
    phInterrupter2: phInterrupter2,
    leftButton: leftButton,
    rightButton: rightButton,
    leftPin: leftPin,
    rightPin: rightPin
  });

  phInterrupter1.on("down", function() {
    //console.log(this.value);
  });

  phInterrupter1.on("up", function() {
    io.emit('turn', {
      direction: 'right'
    });
  });

  phInterrupter2.on("down", function() {
    console.log(this.value);
  });

  phInterrupter2.on("up", function() {
    io.emit('turn', {
      direction: 'left'
    });
  });


    // Button Event API

    // "down" the button is pressed
    leftButton.on("down", function() {
      leftPin.on();
      console.log("down");
      io.emit('button', {
        button: 'left'
      });
    });

    // "hold" the button is pressed for specified time.
    //        defaults to 500ms (1/2 second)
    //        set
    leftButton.on("hold", function() {
      console.log("hold");
    });

    // "up" the button is released
    leftButton.on("up", function() {
      leftPin.off();
      console.log("up");
    });


      // "down" the button is pressed
      rightButton.on("down", function() {
        rightPin.on();
        console.log("down");
        io.emit('button', {
          button: 'right'
        });
      });

      // "hold" the button is pressed for specified time.
      //        defaults to 500ms (1/2 second)
      //        set
      rightButton.on("hold", function() {
        console.log("hold");
      });

      // "up" the button is released
      rightButton.on("up", function() {
        rightPin.off();
        console.log("up");
      });
});
