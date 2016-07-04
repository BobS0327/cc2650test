/*

	This example uses Sandeep Mistry's sensortag library for node.js to
	read data from a TI sensorTag.

	Although the sensortag library functions are all asynchronous,
	there is a sequence you need to follow in order to successfully
	read a tag:
		1) discover the tag
		2) connect to and set up the tag
		3) turn on the sensor you want to use (in this case, IR temp)
		4) turn on notifications for the sensor
		5) listen for changes from the sensortag

	The example reads the object and ambient temperature nad the humidity

*/


var SensorTag = require('sensortag');		// sensortag library

// listen for tags:
SensorTag.discover(function(tag) {
	// when you disconnect from a tag, exit the program:
	tag.on('disconnect', function() {
		console.log('disconnected!');
		process.exit(0);
	});

	function connectAndSetUpMe() {			// attempt to connect to the tag
     console.log('connectAndSetUp');
     tag.connectAndSetUp(enableIrTempandHumidity);	// when you connect, call enableIrTempMe
   }

   function enableIrTempandHumidity() {		// attempt to enable the IR Temperature sensor
     console.log('enableIRTemperatureSensorandHumidity');
     // when you enable the IR Temperature and Humidity sensor, start notifications:
     tag.enableIrTemperature(notifyMeTemp);
     tag.enableHumidity(notifyMeHumidity);

   }

	function notifyMeTemp() {
   	tag.notifyIrTemperature(listenForTempReading);   	// start the temperature sensor listener

   }

	function notifyMeHumidity() {
   	tag.notifyHumidity(listenForHumidityReading);   	// start the humidity sensor listener

   }


   	// When you get an temperature change, print it out:
	function listenForTempReading() {
		tag.on('irTemperatureChange', function(objectTemp, ambientTemp) {
	     console.log('\tObject Temp = %d deg. C', objectTemp.toFixed(1));
	     console.log('\tAmbient Temp = %d deg. C', ambientTemp.toFixed(1));
	   });
	}

 
	// Read humidity, print it out:
	function listenForHumidityReading() {
		tag.on('humidityChange', function(temperature, humidity) {
            console.log('\ttemperature = %d °C', temperature.toFixed(1));
            console.log('\thumidity = %d %', humidity.toFixed(1));
          });
	}

	// Now that you've defined all the functions, start the process:
	connectAndSetUpMe();
});
