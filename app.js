// EveryCorner App.js


// GET USER FROM URL

const params = new URLSearchParams(window.location.search);

let username = params.get("user");


// Default username if no URL is provided

if (!username) {
    username = "Your Corner";
}



// LOAD PROFILE NAME

const cornerName = document.getElementById("cornerName");

if (cornerName) {

    cornerName.innerHTML = username;

}



// PROFILE PICTURE UPLOAD

function uploadProfile(event) {

    const file = event.target.files[0];

    if (file) {

        const image = URL.createObjectURL(file);

        const profilePic = document.getElementById("profilePic");

        if (profilePic) {
            profilePic.src = image;
        }

    }

}



// BANNER UPLOAD

function uploadBanner(event) {

    const file = event.target.files[0];

    if (file) {

        const image = URL.createObjectURL(file);

        const banner = document.getElementById("banner");

        if (banner) {

            banner.style.backgroundImage = 
            "url('" + image + "')";

        }

    }

}



// CHANGE PROFILE NAME

function saveProfile() {

    const nameInput = document.getElementById("nameInput");


    if (nameInput && nameInput.value !== "") {

        document.getElementById("cornerName").innerHTML =
        nameInput.value;

    }

}



// CREATE POSTS

function createPost() {


    const postText = document.getElementById("postText");


    if (!postText || postText.value === "") {

        return;

    }



    const posts = document.getElementById("posts");


    if (posts) {


        posts.innerHTML +=

        `
        <div class="post">
            ${postText.value}
        </div>
        `;


    }


    postText.value = "";


}



// SAVE POSTS IN BROWSER


function savePost() {


    const postText = document.getElementById("postText");


    if (!postText.value) {

        return;

    }


    let savedPosts =
    JSON.parse(localStorage.getItem(username + "_posts")) || [];



    savedPosts.push(postText.value);



    localStorage.setItem(
        username + "_posts",
        JSON.stringify(savedPosts)
    );


}



// LOAD SAVED POSTS


function loadPosts() {


    const posts = document.getElementById("posts");


    if (!posts) {

        return;

    }



    let savedPosts =
    JSON.parse(localStorage.getItem(username + "_posts")) || [];



    savedPosts.forEach(function(post){


        posts.innerHTML +=

        `
        <div class="post">
            ${post}
        </div>
        `;


    });


}



// RUN WHEN PAGE LOADS


window.onload = function() {

    loadPosts();

};
