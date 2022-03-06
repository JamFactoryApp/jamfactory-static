import "./index.css";

let user;
let loginButtonAction = onSpotifyAuth;
let joinButtonAction = onJoin;
getCurrentUser()
getQueryParams()

document.getElementById("main-text").innerText = "Listen to all of your favorite songs and the ones of your friends too."

function onJoin() {
    let label = document.getElementById("jamlabel-input").value
    window.location.href = "./jam/" + label;
}

document.getElementById("jamlabel-input").addEventListener("keyup", checkForValidity)
document.getElementById("jamlabel-input").addEventListener("change", checkForValidity)
document.getElementById("join-button").addEventListener("click", onJoin)

function checkForValidity() {
    document.getElementById("join-error").hidden = true
    if (document.getElementById("jamlabel-input").value.length !== 5) {
        document.getElementById("join-button").classList.add('disabled')
        document.getElementById("join-button").innerText = "Join"
        joinButtonAction = onJoin
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
                joinButtonAction = resumeJamSession
                document.getElementById("jamlabel-input").value = json.joined_label
                document.getElementById("join-button").innerText = "Return"
                document.getElementById("join-button").classList.remove('disabled')
            }
            if (json.spotify_authorized) {
                loginButtonAction = createJamSession
                document.getElementById("login-button").innerText = "Create your own"
            }
        });
}

function getQueryParams() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    if (params.error) {
        document.getElementById("join-error").innerText = params.error
        document.getElementById("join-error").hidden = false
    }
    if (params.label) {
        document.getElementById("jamlabel-input").value = params.label
    }
}

document.getElementById("login-button").addEventListener("click", listenerFunctionLogin)
document.getElementById("join-button").addEventListener("click", listenerFunctionJoin)
function listenerFunctionLogin() {
    loginButtonAction();
}
function listenerFunctionJoin() {
    joinButtonAction();
}

function onSpotifyAuth() {
    fetch('./api/v1/auth/login', {
        credentials: "include"
    })
        .then(response => response.json())
        .then(json => {
            window.location.href = json.url;
        })
}

function createJamSession() {
    window.location.href = "./jam/create";
}

function resumeJamSession() {
    window.location.href = "./jam/" +  document.getElementById("jamlabel-input").value;
}