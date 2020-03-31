var icloud = require("find-my-iphone").findmyphone;

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});
icloud.apple_id = "abdallah.sh1999@hotmail.com";
icloud.password = "Abdulla^99";

function alarm(month, day, hour, minute) {
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

    if (device) {
      var myLatitude = 45.487115610618666;
      var myLongitude = -73.59342746694155;

      console.log(month - 1, day, hour, minute);
      var year = 2020;
      var alarm = new Date(year, month - 1, day, hour, minute);
      var now = new Date();
      console.log(alarm - now);
      curLat = device.location.latitude;
      curLong = device.location.longitude;
      if (
        Math.abs(curLat - myLatitude) < 0.0006 &&
        Math.abs(curLong - myLongitude) < 0.0006
      ) {
        setTimeout(() => {
          icloud.alertDevice(device.id, function(err) {});
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
  }, 300000);
}

alarm(3, 30, 19, 23);
alarm(3, 30, 19, 24);
