// EveryCorner App.js
// LocalStorage Social Profile System


// =============================
// ACCOUNT SYSTEM
// =============================


function getUsers(){

    return JSON.parse(
        localStorage.getItem("users")
    ) || {};

}



function saveUsers(users){

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

}





function createAccount(event){

    event.preventDefault();


    let username =
    document.getElementById("username")
    .value.trim();



    let password =
    document.getElementById("password")
    .value;



    if(!username || !password){

        alert("Fill in all fields");
        return;

    }



    let users = getUsers();



    if(users[username]){

        alert("Username already exists");
        return;

    }



    users[username]={

        password:password,

        followers:[],

        following:[],

        posts:[],

        picture:"everycorner.png",

        banner:"",

        created:new Date().toISOString()

    };



    saveUsers(users);



    localStorage.setItem(
        "loggedInUser",
        username
    );



    window.location.href =
    "profile.html?user=" + username;


}





function signIn(event){

    event.preventDefault();



    let username =
    document.getElementById("username")
    .value.trim();



    let password =
    document.getElementById("password")
    .value;



    let users = getUsers();



    if(
        !users[username] ||
        users[username].password !== password
    ){

        alert("Incorrect username or password");
        return;

    }



    localStorage.setItem(
        "loggedInUser",
        username
    );



    window.location.href =
    "profile.html?user=" + username;


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






// =============================
// PROFILE LOADING
// =============================



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
    getUsers();



    let user =
    users[username];



    if(!user){

        document.getElementById("cornerName")
        .innerHTML="User not found";

        return;

    }




    let name =
    document.getElementById("cornerName");



    if(name){

        name.innerHTML =
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







// =============================
// IMAGE UPLOADS
// =============================



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
        getUsers();



        users[username].picture =
        e.target.result;



        saveUsers(users);



        document.getElementById("profilePic")
        .src=e.target.result;


    };



    reader.readAsDataURL(file);


}





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
        getUsers();



        users[username].banner =
        e.target.result;



        saveUsers(users);



        document.getElementById("banner")
        .style.backgroundImage =
        "url('" + e.target.result + "')";


    };



    reader.readAsDataURL(file);


}

// =============================
// CHANGE CORNER NAME
// =============================


function saveProfile(){


    let oldUsername =
    getLoggedInUser();



    let newUsername =
    document.getElementById("nameInput")
    .value.trim();



    if(!newUsername){

        alert("Enter a name");
        return;

    }



    let users =
    getUsers();



    if(
        users[newUsername] &&
        newUsername !== oldUsername
    ){

        alert("That username already exists");
        return;

    }



    if(newUsername !== oldUsername){


        users[newUsername] =
        users[oldUsername];


        delete users[oldUsername];



        localStorage.setItem(
            "loggedInUser",
            newUsername
        );

    }



    saveUsers(users);



    window.location.href =
    "profile.html?user=" + newUsername;


}






// =============================
// POSTS
// =============================



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
    getUsers();



    users[username].posts.push({

        text:text,

        date:new Date().toISOString()

    });



    saveUsers(users);



    document.getElementById("postText")
    .value="";



    loadPosts();


}






function loadPosts(){


    let username =
    getProfileUser();



    let users =
    getUsers();



    if(!users[username]){

        return;

    }



    let area =
    document.getElementById("posts");



    if(!area){

        return;

    }



    area.innerHTML="";



    users[username].posts
    .forEach(function(post){



        area.innerHTML +=

        `
        <div class="post">

        ${post.text}

        </div>
        `;



    });


}







// =============================
// FOLLOW SYSTEM
// =============================



function followUser(){


    let target =
    getProfileUser();



    let follower =
    getLoggedInUser();



    if(!follower){

        alert("Sign in first");
        return;

    }



    if(!target){

        alert("Profile not found");
        return;

    }



    if(target === follower){

        alert("You cannot follow yourself");
        return;

    }



    let users =
    getUsers();



    if(!users[target]){

        alert("User not found");
        return;

    }



    if(
        users[target].followers
        .includes(follower)
    ){

        alert("You already follow this Corner");
        return;

    }



    users[target]
    .followers
    .push(follower);



    saveUsers(users);



    showFollowers();


}








function showFollowers(){


    let username =
    getProfileUser();



    let users =
    getUsers();



    if(!users[username]){

        return;

    }



    let amount =
    users[username]
    .followers.length;



    let display =
    document.getElementById("followers");



    if(!display){

        return;

    }



    if(amount === 1){

        display.innerHTML =
        "1 Follower";

    }

    else{

        display.innerHTML =
        amount + " Followers";

    }


}







// =============================
// PROFILE VIEW CONTROLS
// =============================



function setupProfileView(){


    let profileUser =
    getProfileUser();



    let loggedUser =
    getLoggedInUser();



    let settings =
    document.getElementById("settings");



    let postBox =
    document.getElementById("postBox");



    let followButton =
    document.getElementById("followButton");



    if(
        profileUser &&
        profileUser !== loggedUser
    ){


        if(settings){

            settings.style.display="none";

        }



        if(postBox){

            postBox.style.display="none";

        }



        if(followButton){

            followButton.style.display="inline-block";

        }


    }

    else{


        if(followButton){

            followButton.style.display="none";

        }


    }


}








// =============================
// START APP
// =============================



window.onload=function(){


    if(
        document.getElementById("cornerName")
    ){

        loadProfile();

        setupProfileView();

    }


};
