var icloud = require("find-my-iphone").findmyphone;

icloud.apple_id = "abdallah.sh1999@hotmail.com";
icloud.password = "Abdulla^99";

function alarm() {
  icloud.getDevices(function(error, devices) {
    var device;

    if (error) {
      throw error;
    }
    //pick a device with location and findMyPhone enabled
    devices.forEach(function(d) {
      if (
        d.modelDisplayName == "iPhone" &&
        device == undefined &&
        d.location &&
        d.lostModeCapable
      ) {
        device = d;
      }
    });
    //   console.log(device);
    if (device) {
      //gets the distance of the device from my location
      var myLatitude = 45.487115610618666;
      var myLongitude = -73.59342746694155;

      // icloud.getDistanceOfDevice(device, myLatitude, myLongitude, function(
      //   err,
      //   result
      // ) {
      //   console.log("Distance: " + result.distance.text);
      //   console.log("Driving time: " + result.duration.text);
      // });

      // icloud.alertDevice(device.id, function(err) {
      //   console.log("Beep Beep!");
      // });

      // icloud.getLocationOfDevice(device, function(err, location) {
      //   console.log(location);
      // });
      var year = 2020;
      var month = 2;
      var day = 26;
      var hour = 15;
      var minute = 1;
      var alarm = new Date(year, month, day, hour, minute);
      var now = new Date();
      console.log(alarm - now);
      curLat = device.location.latitude;
      curLong = device.location.longitude;
      if (
        Math.abs(curLat - myLatitude) < 0.0006 &&
        Math.abs(curLong - myLongitude) < 0.0006
      ) {
        //   console.log(curLat);
        //   console.log(curLong);
        setTimeout(() => {
          icloud.alertDevice(device.id, function(err) {
            // console.log(device.id);
          });
          interval();
        }, alarm - now);
      }
    }
  });
}

function interval() {
  setInterval(() => {
    icloud.getDevices(function(error, devices) {
      var device;

      if (error) {
        throw error;
      }
      //pick a device with location and findMyPhone enabled
      devices.forEach(function(d) {
        if (
          d.modelDisplayName == "iPhone" &&
          device == undefined &&
          d.location &&
          d.lostModeCapable
        ) {
          device = d;
        }
      });
      //   console.log(device);
      if (device) {
        //gets the distance of the device from my location
        var myLatitude = 45.487115610618666;
        var myLongitude = -73.59342746694155;

        curLat = device.location.latitude;
        curLong = device.location.longitude;
        if (
          Math.abs(curLat - myLatitude) < 0.0006 &&
          Math.abs(curLong - myLongitude) < 0.0006
        ) {
          console.log(curLat);
          console.log(curLong);

          icloud.alertDevice(device.id, function(err) {
            console.log(device.id);
          });
        } else {
          clearInterval(interval);
        }
      }
    });
  }, 60000);
}

alarm();
