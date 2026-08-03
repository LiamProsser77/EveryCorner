function createAccount(event) {

    event.preventDefault();

    let username = document.getElementById("username").value.trim();


    if (username !== "") {

        localStorage.setItem("everycorner_username", username);

        window.location.href = "profile.html?user=" + encodeURIComponent(username);

    }

}



function signIn(event) {

    event.preventDefault();

    let username = document.getElementById("username").value.trim();


    if (username !== "") {

        localStorage.setItem("everycorner_username", username);

        window.location.href = "profile.html?user=" + encodeURIComponent(username);

    }

}



// PROFILE PAGE

function loadProfile() {


    let params = new URLSearchParams(window.location.search);


    let username = params.get("user");



    if (!username) {

        username = localStorage.getItem("everycorner_username");

    }



    if (username) {


        let name = document.getElementById("cornerName");


        if (name) {

            name.innerHTML = username + "'s Corner";

        }


    }

}


document.addEventListener("DOMContentLoaded", loadProfile);
