
import "./index.css";
let user;
let loginButtonAction = onSpotifyAuth;
getCurrentUser()

document.getElementById("main-text").innerText= "Listen to all of your favorite songs and the ones of your friends too."

function onJoin() {
     let body = {label: document.getElementById("jamlabel-input").value}
     if (body.label.length === 5) {
         fetch('./api/v1/jam/join',
             {
                 credentials: "include",
                 method: "PUT",
                 body: JSON.stringify(body),
                 headers: {
                     'Content-Type': 'application/json'
                 },
             })
             .then(response => response.json())
             .then(json => {
                 window.location.href  = "./jam/" + json.label;
             }).catch(reason => {
         })

     }
}

document.getElementById("jamlabel-input").addEventListener("keyup", checkForValidity)
document.getElementById("jamlabel-input").addEventListener("change", checkForValidity)
document.getElementById("join-button").addEventListener("click", onJoin)
function checkForValidity() {
    if (document.getElementById("jamlabel-input").value.length !== 5) {
        document.getElementById("join-button").classList.add('disabled')
    } else {
        document.getElementById("join-button").classList.remove('disabled')
    }

}

function getCurrentUser() {
    fetch('./api/v1/me',
        {
            credentials: "include"
        })
        .then(response => response.json())
        .then(json => {
             if (json.joined_label !== '') {
                  window.location.href  = "./jam/" + json.joined_label;
             }
             if (json.spotify_authorized) {
                 loginButtonAction = createJamSession
                 document.getElementById("login-button").innerText = "Create your own"
             }
        });
}

document.getElementById("login-button").addEventListener("click", listenerFunction)
function listenerFunction() {
    loginButtonAction();
}
function onSpotifyAuth() {
    fetch('./api/v1/auth/login', {
        credentials: "include"
    })
        .then(response => response.json())
        .then(json => {
            window.location.href  = json.url;
        })
}

function createJamSession() {
     fetch('./api/v1/jam/create',
         {
             credentials: "include"
         })
         .then(response => response.json())
         .then(json => {
              window.location.href  = "./jam/" + json.label;
         })
}