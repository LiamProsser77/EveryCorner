// EveryCorner App.js
// LocalStorage Social Network System


// ==========================
// ACCOUNT SYSTEM
// ==========================


function createAccount(username, password){

    let users =
    JSON.parse(localStorage.getItem("users")) || {};


    if(users[username]){

        return false;

    }


    users[username] = {

        password: password,

        followers: 0,

        followersList: [],

        posts: [],

        picture: "everycorner.png",

        banner: ""

    };


    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );


    localStorage.setItem(
        "loggedInUser",
        username
    );


    return true;

}





function login(username,password){


    let users =
    JSON.parse(localStorage.getItem("users")) || {};



    if(
        users[username] &&
        users[username].password === password
    ){

        localStorage.setItem(
            "loggedInUser",
            username
        );


        return true;

    }


    return false;

}





function logout(){

    localStorage.removeItem(
        "loggedInUser"
    );


    window.location.href =
    "signin.html";

}





function getLoggedInUser(){

    return localStorage.getItem(
        "loggedInUser"
    );

}





// ==========================
// GET PROFILE USER
// ==========================


function getProfileUser(){


    let params =
    new URLSearchParams(
        window.location.search
    );


    let username =
    params.get("user");



    if(username){

        return username;

    }



    return getLoggedInUser();

}





// ==========================
// LOAD PROFILE
// ==========================


function loadProfile(){


    let username =
    getProfileUser();



    let users =
    JSON.parse(localStorage.getItem("users")) || {};



    let user =
    users[username];



    let title =
    document.getElementById("cornerName");



    if(!user){


        if(title){

            title.innerHTML =
            "User Not Found";

        }


        return;

    }




    if(title){

        title.innerHTML =
        username + "'s Corner";

    }




    let pic =
    document.getElementById("profilePic");



    if(pic){

        pic.src =
        user.picture || "everycorner.png";

    }




    let banner =
    document.getElementById("banner");



    if(
        banner &&
        user.banner
    ){

        banner.style.backgroundImage =
        "url('" + user.banner + "')";

    }



    showFollowers();

    loadPosts();


}





// ==========================
// PROFILE PICTURE
// ==========================


function uploadProfile(event){


    let username =
    getLoggedInUser();



    let file =
    event.target.files[0];



    if(!file){

        return;

    }



    let reader =
    new FileReader();



    reader.onload=function(e){


        let users =
        JSON.parse(
            localStorage.getItem("users")
        );



        users[username].picture =
        e.target.result;



        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );



        document.getElementById("profilePic")
        .src=e.target.result;


    };


    reader.readAsDataURL(file);


}





// ==========================
// BANNER
// ==========================


function uploadBanner(event){


    let username =
    getLoggedInUser();



    let file =
    event.target.files[0];



    if(!file){

        return;

    }



    let reader =
    new FileReader();



    reader.onload=function(e){


        let users =
        JSON.parse(
            localStorage.getItem("users")
        );



        users[username].banner =
        e.target.result;



        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );



        document.getElementById("banner")
        .style.backgroundImage =
        "url('" + e.target.result + "')";


    };


    reader.readAsDataURL(file);


}





// ==========================
// CHANGE NAME
// ==========================


function saveProfile(){


    let oldName =
    getLoggedInUser();



    let newName =
    document.getElementById("nameInput")
    .value.trim();



    if(!newName){

        return;

    }



    let users =
    JSON.parse(localStorage.getItem("users"));



    if(
        users[newName] &&
        newName !== oldName
    ){

        alert("Username already exists");

        return;

    }



    users[newName] =
    users[oldName];



    delete users[oldName];



    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );



    localStorage.setItem(
        "loggedInUser",
        newName
    );



    window.location.href =
    "profile.html?user=" + newName;


}





// ==========================
// POSTS
// ==========================


function createPost(){


    let username =
    getLoggedInUser();



    let text =
    document.getElementById("postText")
    .value.trim();



    if(!text){

        return;

    }



    let users =
    JSON.parse(localStorage.getItem("users"));



    users[username].posts.push(text);



    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );



    document.getElementById("postText")
    .value="";



    loadPosts();


}





function loadPosts(){


    let username =
    getProfileUser();



    let users =
    JSON.parse(localStorage.getItem("users")) || {};



    let area =
    document.getElementById("posts");



    if(
        !area ||
        !users[username]
    ){

        return;

    }



    area.innerHTML="";



    users[username].posts.forEach(function(post){


        area.innerHTML +=

        `
        <div class="post">
        ${post}
        </div>
        `;


    });


}





// ==========================
// FOLLOW SYSTEM
// ==========================


function followUser(){


    let target =
    getProfileUser();


    let follower =
    getLoggedInUser();



    if(!follower){

        alert("Sign in first");

        return;

    }



    if(target === follower){

        alert("You cannot follow yourself");

        return;

    }



    let users =
    JSON.parse(localStorage.getItem("users")) || {};



    if(!users[target]){

        alert("User does not exist");

        return;

    }



    if(
        !users[target].followersList
    ){

        users[target].followersList=[];

    }



    if(
        users[target]
        .followersList
        .includes(follower)
    ){

        alert("Already following");

        return;

    }



    users[target]
    .followersList
    .push(follower);



    users[target].followers =
    users[target]
    .followersList
    .length;



    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );



    showFollowers();


}





function showFollowers(){


    let username =
    getProfileUser();



    let users =
    JSON.parse(localStorage.getItem("users")) || {};



    if(!users[username]){

        return;

    }



    let display =
    document.getElementById("followers");



    if(display){

        let count =
        users[username].followers || 0;



        display.innerHTML =
        count +
        (count === 1 ?
        " Follower" :
        " Followers");

    }


}





// ==========================
// START
// ==========================


window.onload=function(){


    if(
        document.getElementById("cornerName")
    ){

        loadProfile();

    }


};
