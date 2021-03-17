function login(){
  console.log("called")
  var form = $('#login_form');
  var formData = $(form).serialize();
  event.preventDefault();
  jQuery.ajax({
      type: 'POST',
      url: "/user/login",
      data: formData
  }).done(function(response) {
      console.log(response);
      if(response.Status===1){
          console.log(response)
          window.location = "/menu/dashboard";
      }else{
          console.log(response);
          alert(response.Message);
          form[0].reset();
      }
  })
}

function signup(){
  console.log("called")
  var form = $('#signup_form');
  var formData = $(form).serialize();
  event.preventDefault();
  jQuery.ajax({
      type: 'POST',
      url: "/user/signup",
      data: formData
  }).done(function(response) {
      console.log(response);
      if(response.Status===1){
          console.log(response)
          window.location = "/";
      }else{
          console.log(response);
          alert(response.Message);
          form[0].reset();
      }
  })
}

// When the user clicks on <span> (x), close the modal
// Get the <span> element that closes the modal
var closelogin = document.getElementsByClassName("close")[0];
closelogin.onclick = function() {
  document.getElementById("loginModal").style.display = "none";
}

var closesignup = document.getElementsByClassName("close")[1];
closesignup.onclick = function() {
  document.getElementById("signupModal").style.display = "none";
}

// Get the button that opens the modal
var loginbtn = document.getElementById("login_modal_button");
// When the user clicks on the button, open the modal
loginbtn.onclick = function() {
  document.getElementById("loginModal").style.display = "block";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if ((event.target == document.getElementById("loginModal"))||(event.target == document.getElementById("signupModal"))) {
    document.getElementById("loginModal").style.display = "none";
    document.getElementById("signupModal").style.display = "none";
  }
}

var signupbtn = document.getElementById("signup_modal_button");

signupbtn.onclick = function() {
  document.getElementById("loginModal").style.display = "none";
  document.getElementById("signupModal").style.display = "block";
}