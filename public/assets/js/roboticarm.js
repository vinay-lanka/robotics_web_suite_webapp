function connect(){
    var address = document.getElementById('address').value;
    console.log(address);
    // Create a connection to the rosbridge WebSocket server.
    var url = 'ws://' + address + ':9090';
    ros.connect(url);
}

var ros = new ROSLIB.Ros();

// If there is an error on the backend, an 'error' emit will be emitted.
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

//JointState Listener
var listener = new ROSLIB.Topic({
  ros : ros,
  name : '/joint_states',
  messageType : 'sensor_msgs/JointState'
});

listener.subscribe(function(message) {
  document.getElementById("p1").innerHTML = message.position[0]*57.2958;
  document.getElementById("p2").innerHTML = message.position[1]*57.2958;
  document.getElementById("p3").innerHTML = message.position[2]*57.2958;
  document.getElementById("p4").innerHTML = message.position[3]*57.2958;
  document.getElementById("p5").innerHTML = message.position[4]*57.2958;
});

//jogState Publisher
var jogPublisher = new ROSLIB.Topic({
    ros : ros,
    name : '/servo_server/delta_twist_cmds',
    messageType : 'geometry_msgs/TwistStamped'
});

var jogMsg = new ROSLIB.Message({
    twist: {
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
    }
});

uptimer = setInterval(function () {
    jogPublisher.publish(jogMsg);
}, 100);
  
//xplus
function xplusDown() {
    var jogMsg = new ROSLIB.Message({
        twist: {
            linear : {
                x : 1,
                y : 0,
                z : 0
            },
            angular : {
                x : 0,
                y : 0,
                z : 0
            }
        }
    });
    clearInterval(uptimer);
    downtimer = setInterval(function () {
        jogPublisher.publish(jogMsg);
    }, 25);
}

//xminus
function xminusDown() {
    var jogMsg = new ROSLIB.Message({
        twist: {
            linear : {
                x : -1,
                y : 0,
                z : 0
            },
            angular : {
                x : 0,
                y : 0,
                z : 0
            }
        }
    });
    clearInterval(uptimer);
    downtimer = setInterval(function () {
        jogPublisher.publish(jogMsg);
    }, 25);
}

//yplus
function yplusDown() {
    var jogMsg = new ROSLIB.Message({
        twist: {
            linear : {
                x : 0,
                y : 1,
                z : 0
            },
            angular : {
                x : 0,
                y : 0,
                z : 0
            }
        }
    });
    clearInterval(uptimer);
    downtimer = setInterval(function () {
        jogPublisher.publish(jogMsg);
    }, 25);
}

//yminus
function yminusDown() {
    var jogMsg = new ROSLIB.Message({
        twist: {
            linear : {
                x : 0,
                y : -1,
                z : 0
            },
            angular : {
                x : 0,
                y : 0,
                z : 0
            }
        }
    });
    clearInterval(uptimer);
    downtimer = setInterval(function () {
        jogPublisher.publish(jogMsg);
    }, 25);
}

//zplus
function zplusDown() {
    var jogMsg = new ROSLIB.Message({
        twist: {
            linear : {
                x : 0,
                y : 0,
                z : 1
            },
            angular : {
                x : 0,
                y : 0,
                z : 0
            }
        }
    });
    clearInterval(uptimer);
    downtimer = setInterval(function () {
        jogPublisher.publish(jogMsg);
    }, 25);
}

//zminus
function zminusDown() {
    var jogMsg = new ROSLIB.Message({
        twist: {
            linear : {
                x : 0,
                y : 0,
                z : -1
            },
            angular : {
                x : 0,
                y : 0,
                z : 0
            }
        }
    });
    clearInterval(uptimer);
    downtimer = setInterval(function () {
        jogPublisher.publish(jogMsg);
    }, 25);
}

//un-press
function Up() {
    // console.log("called");
    var jogMsg = new ROSLIB.Message({
        twist: {
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
        }
    });
    clearInterval(downtimer);
    uptimer = setInterval(function () {
        jogPublisher.publish(jogMsg);
    }, 25);
}

