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

var currentState;

listener.subscribe(function(message) {
  document.getElementById("p1").innerHTML = message.position[0]*57.2958;
  document.getElementById("p2").innerHTML = message.position[1]*57.2958;
  document.getElementById("p3").innerHTML = message.position[2]*57.2958;
  document.getElementById("p4").innerHTML = message.position[3]*57.2958;
  document.getElementById("p5").innerHTML = message.position[4]*57.2958;
  currentState = message;
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

var savePointClient = new ROSLIB.Service({
    ros : ros,
    name : '/save_point',
    serviceType : 'roboticarm_backend/SavePoint'
});
function savePoint() {
    var delayInput = document.getElementById("delay");
    var request = new ROSLIB.ServiceRequest({
        delay: parseInt(delayInput.value)
    });
    savePointClient.callService(request, function(result) {
        if(result.response === 200){
            alert("Point Saved");
        }else{
            alert("Error saving point");
        }
    });
}

var deletePointsClient = new ROSLIB.Service({
    ros : ros,
    name : '/delete_point',
    serviceType : 'roboticarm_backend/DeletePoint'
});
function deletePoint() {
    var request = new ROSLIB.ServiceRequest({
        body: 1
    });

    deletePointsClient.callService(request, function(result) {
        if(result.response === 200){
            alert("Point Deleted");
        }else{
            alert("Error deleting point");
        }
    });
}

var saveConfigClient = new ROSLIB.Service({
    ros : ros,
    name : '/save_config',
    serviceType : 'roboticarm_backend/SaveConfig'
});
function saveConfig() {
    var request = new ROSLIB.ServiceRequest({
        body: 1
    });

    saveConfigClient.callService(request, function(result) {

        if(result.response === 200){
            alert("Point Saved");
        }else{
            alert("Error saving point");
        }
    });
}

var controllerClient = new ROSLIB.Service({
    ros : ros,
    name : '/controller_manager/switch_controller',
    serviceType : 'controller_manager_msgs/SwitchController'
});

function start_jog_controller() {

    console.log("called");

    var request = new ROSLIB.ServiceRequest({
        start_controllers: ['/roboticarm/controller/arm_joint_group_position_controller'],
        stop_controllers: ['/roboticarm/controller/arm_trajectory_controller'],
        strictness: 2,
        start_asap: false,
        timeout: 0.0
    });

    controllerClient.callService(request, function(result) {
        console.log(result);
    });
}

function stop_jog_controller() {

    console.log("called");

    var request = new ROSLIB.ServiceRequest({
        start_controllers: ['/roboticarm/controller/arm_trajectory_controller'],
        stop_controllers: ['/roboticarm/controller/arm_joint_group_position_controller'],
        strictness: 2,
        start_asap: false,
        timeout: 0.0
    });

    controllerClient.callService(request, function(result) {
        console.log(result);
    });
}