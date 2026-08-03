// EveryCorner App System


function createAccount(event) {

    event.preventDefault();


    const username =
    document.getElementById("username").value;


    if(username.trim() !== "") {


        localStorage.setItem(
            "everycorner_user",
            username
        );


        window.location.href =
        "profile.html?user=" + username;


    }

}





function signIn(event) {

    event.preventDefault();


    const username =
    document.getElementById("username").value;


    if(username.trim() !== "") {


        localStorage.setItem(
            "everycorner_user",
            username
        );


        window.location.href =
        "profile.html?user=" + username;


    }

}





// Load profile username

function loadProfile() {


    const params =
    new URLSearchParams(window.location.search);


    let username =
    params.get("user");



    if(!username) {


        username =
        localStorage.getItem("everycorner_user");


    }



    if(username) {


        const name =
        document.getElementById("cornerName");


        if(name) {

            name.innerHTML =
            username + "'s Corner";

        }


    }

}


window.onload = loadProfile;
