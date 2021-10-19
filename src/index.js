
import "./styles.css";
let user;
getCurrentUser()

function onJoin() {
     let label = document.getElementById("jamlabel").value
     if (label.length === 5) {
          window.location.href  = "./jam/" + label.toUpperCase();
     }
}

function checkForValidity() {
     document.getElementById("joinbutton").disabled = document.getElementById("jamlabel").value.length !== 5;
}

function getCurrentUser() {
    fetch('http://localhost:3000/api/v1/me')
        .then(response => response.json())
        .then(user => {
             console.log(user)
             if (user.joined_label !== '') {
                  window.location.href  = "./jam/" + user.joined_label;
             }
             if (user.spotify_authorized) {
                  document.getElementById("loginbuttontext").innerText = "Create your own"
             }
        });
}

function createJamSession() {
     fetch('http://localhost:3000/api/v1/jam/create')
         .then(response => response.json().label)
         .then(label => {
              window.location.href  = "./jam/" + label;
         })
}