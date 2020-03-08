// $ firmata-party uno --debug
// $ node ardulink.js

const five = require('johnny-five');
const board = new five.Board();

let interruptorPin1 = 2,
    interruptorPin2 = 4,
    buttonPin1 = 8,
    buttonPin2 = 9,
    ledPin1 = 11,
    ledPin2 = 12,
    leftController,
    rightController,
    leftButton,
    rightButton,
    leftPin,
    rightPin;

board.on('ready', function(){

  console.log('yea');
  //leftController = new five.Sensor.Digital(interruptorPin1);
  rightController = new five.Sensor.Digital(interruptorPin2);
  leftButton = new five.Button(buttonPin1);
  rightButton = new five.Button(buttonPin2);
  leftPin = new five.Led(ledPin1);
  rightPin = new five.Led(ledPin2);

this.pinMode(interruptorPin1, five.Pin.INPUT_PULLUP);
this.digitalRead(interruptorPin1, function(value) {
    console.log(value);
  });

 // Inject the `button` hardware into
 // the Repl instance's context;
 // allows direct command line access
 board.repl.inject({
   leftController: leftController,
   rightController: rightController,
   leftButton: leftButton,
   rightButton: rightButton,
   leftPin: leftPin,
   rightPin: rightPin
 });


  //console.log(leftController.value, "  ", rightController.value)
/*
    leftController.on("change", function() {
    console.log(leftController.value);
  });
  rightController.on("change", function() {
  console.log(rightController.value);
});

*/


  // Button Event API

  // "down" the button is pressed
  leftButton.on("down", function() {
    leftPin.on();
    console.log("down");
    //console.log(leftController.value);
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
