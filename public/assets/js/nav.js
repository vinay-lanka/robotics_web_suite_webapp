function connect(){
  var address = document.getElementById('address').value;
  console.log(address);
  // Create a connection to the rosbridge WebSocket server.
  var url = 'ws://' + address + ':9090';
  ros.connect(url);
  var viewer = new ROS2D.Viewer({
    divID : 'map',
    width : 400,
    height : 300
  });

  // Setup the map client.
  var nav = NAV2D.OccupancyGridClientNav({
    ros : ros,
    rootObject : viewer.scene,
    viewer : viewer,
    serverName : '/move_base',
    topic : 'map',
    withOrientation : true
  });
  nav.scaleToDimensions(400,400);
}

var ros = new ROSLIB.Ros();

ros.on('error', function(error) {
  document.getElementById('connecting').style.display = 'none';
  document.getElementById('connected').style.display = 'none';
  document.getElementById('closed').style.display = 'none';
  document.getElementById('error').style.display = 'inline';
  console.log(error);
});
// Find out exactly when we made a connection.
ros.on('connection', function() {
  console.log('Connection made!');
  document.getElementById('connecting').style.display = 'none';
  document.getElementById('error').style.display = 'none';
  document.getElementById('closed').style.display = 'none';
  document.getElementById('connected').style.display = 'inline';
});
ros.on('close', function() {
  console.log('Connection closed.');
  document.getElementById('connecting').style.display = 'none';
  document.getElementById('connected').style.display = 'none';
  document.getElementById('closed').style.display = 'inline';
});

//jogState Publisher
var drivePublisher = new ROSLIB.Topic({
  ros : ros,
  name : '/cmd_vel',
  messageType : 'geometry_msgs/Twist;'
});

var driveMsg = new ROSLIB.Message({
  linear : {
      x : 0.5,
      y : 0,
      z : 0
  },
  angular : {
      x : 0,
      y : 0,
      z : 0
  }
});

//xplus
function frontDown() {
  var driveMsg = new ROSLIB.Message({
          linear : {
              x : 0.5,
              y : 0,
              z : 0
          },
          angular : {
              x : 0,
              y : 0,
              z : 0
          }
    
  });
  drivePublisher.publish(driveMsg);
}

function leftDown() {
  var driveMsg = new ROSLIB.Message({
          linear : {
              x : 0,
              y : 0,
              z : 0
          },
          angular : {
              x : 0,
              y : 0,
              z : 0.75
          }
    
  });
  drivePublisher.publish(driveMsg);
}

function rightDown() {
  var driveMsg = new ROSLIB.Message({
          linear : {
              x : 0,
              y : 0,
              z : 0
          },
          angular : {
              x : 0,
              y : 0,
              z : -0.75
          }
    
  });
  drivePublisher.publish(driveMsg);
}

function backDown() {
  var driveMsg = new ROSLIB.Message({
          linear : {
              x : -0.5,
              y : 0,
              z : 0
          },
          angular : {
              x : 0,
              y : 0,
              z : 0
          }
    
  });
  drivePublisher.publish(driveMsg);
}

function stopDown() {
  var driveMsg = new ROSLIB.Message({
          linear : {
              x : 0,
              y : 0,
              z : 0
          },
          angular : {
              x : 0,
              y : 0,
              z : 0
          }
    
  });
  drivePublisher.publish(driveMsg);
}


var savePointsClient = new ROSLIB.Service({
  ros : ros,
  name : '/save_points',
  serviceType : 'roboticarm_backend/SavePoint'
});


function savePoint() {
  var delayInput = document.getElementById("delay");
  console.log(typeof delayInput);
  var request = new ROSLIB.ServiceRequest({
      point: currentState.position,
      delay: parseInt(delayInput.value)
  });

  savePointsClient.callService(request, function(result) {
      // console.log('Result for service call on '
      //     + savePointsClient.name
      //     + ': '
      //     + result.response);
      delayInput.innerHTML('');
      if(result.response === 200){
          alert("Point Saved");
      }else{
          alert("Error saving point");
      }
  });
  // console.log(lol.position);
}