// EveryCorner App.js
// LocalStorage Account Version


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


    window.location.href="signin.html";

}




function getLoggedInUser(){

    return localStorage.getItem(
        "loggedInUser"
    );

}





// ==========================
// PROFILE
// ==========================


function getProfileUser(){


    let params =
    new URLSearchParams(
        window.location.search
    );


    let user =
    params.get("user");



    if(user){

        return user;

    }



    return getLoggedInUser();

}





function loadProfile(){


    let username =
    getProfileUser();



    let users =
    JSON.parse(
        localStorage.getItem("users")
    ) || {};



    let user =
    users[username];



    if(!user){

        return;

    }



    let title =
    document.getElementById("cornerName");



    if(title){

        title.innerHTML =
        username + "'s Corner";

    }



    let picture =
    document.getElementById("profilePic");



    if(picture){

        picture.src =
        user.picture;

    }



    if(user.banner){

        document.getElementById("banner")
        .style.backgroundImage =
        "url('" + user.banner + "')";

    }



    showFollowers();

    loadPosts();


}





// ==========================
// UPLOAD PROFILE PICTURE
// ==========================


function uploadProfile(event){


    let username =
    getLoggedInUser();



    let file =
    event.target.files[0];



    if(file){


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


}





// ==========================
// UPLOAD BANNER
// ==========================


function uploadBanner(event){


    let username =
    getLoggedInUser();



    let file =
    event.target.files[0];



    if(file){


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

}





// ==========================
// CHANGE USERNAME
// ==========================


function saveProfile(){


    let oldUsername =
    getLoggedInUser();



    let newUsername =
    document.getElementById("nameInput")
    .value.trim();



    if(!newUsername){

        return;

    }



    let users =
    JSON.parse(
        localStorage.getItem("users")
    );



    if(users[newUsername]){

        alert("Username already exists");

        return;

    }



    users[newUsername] =
    users[oldUsername];



    delete users[oldUsername];



    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );



    localStorage.setItem(
        "loggedInUser",
        newUsername
    );



    window.location.href =
    "profile.html?user=" + newUsername;


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
    JSON.parse(
        localStorage.getItem("users")
    );



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
    JSON.parse(
        localStorage.getItem("users")
    );



    let area =
    document.getElementById("posts");



    if(!area || !users[username]){

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


    let username =
    getProfileUser();



    let users =
    JSON.parse(
        localStorage.getItem("users")
    );



    users[username].followers++;



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
    JSON.parse(
        localStorage.getItem("users")
    );



    if(!users[username]){

        return;

    }



    let count =
    users[username].followers;



    let display =
    document.getElementById("followers");



    if(display){


        if(count === 1){

            display.innerHTML =
            "1 Follower";

        }

        else{

            display.innerHTML =
            count + " Followers";

        }


    }


}





window.onload=function(){

    if(document.getElementById("cornerName")){

        loadProfile();

    }

};
