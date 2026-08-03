// EveryCorner App.js


// GET USER FROM URL

function getUsername() {

    const params =
    new URLSearchParams(window.location.search);

    let user = params.get("user");


    if(user){

        localStorage.setItem(
            "everycorner_username",
            user
        );

    }


    if(!user){

        user =
        localStorage.getItem(
            "everycorner_username"
        );

    }


    return user || "New User";

}




// LOAD PROFILE

function loadProfile(){


    let username = getUsername();



    let name =
    document.getElementById("cornerName");


    if(name){

        name.innerHTML =
        username + "'s Corner";

    }



    let savedPicture =
    localStorage.getItem(
        username + "_picture"
    );


    if(savedPicture){

        document.getElementById("profilePic").src =
        savedPicture;

    }



    let savedBanner =
    localStorage.getItem(
        username + "_banner"
    );


    if(savedBanner){

        document.getElementById("banner").style.backgroundImage =
        "url('" + savedBanner + "')";

    }



    loadPosts();


}




// PROFILE PICTURE

function uploadProfile(event){


    let username = getUsername();


    let file =
    event.target.files[0];


    if(file){


        let reader =
        new FileReader();



        reader.onload=function(e){


            localStorage.setItem(
                username + "_picture",
                e.target.result
            );


            document.getElementById("profilePic").src =
            e.target.result;


        };


        reader.readAsDataURL(file);


    }


}




// BANNER


function uploadBanner(event){


    let username = getUsername();


    let file =
    event.target.files[0];


    if(file){


        let reader =
        new FileReader();



        reader.onload=function(e){


            localStorage.setItem(
                username + "_banner",
                e.target.result
            );


            document.getElementById("banner").style.backgroundImage =
            "url('" + e.target.result + "')";


        };


        reader.readAsDataURL(file);


    }


}




// CHANGE NAME


function saveProfile(){


    let oldName =
    getUsername();


    let newName =
    document.getElementById("nameInput").value;



    if(newName){


        localStorage.setItem(
            "everycorner_username",
            newName
        );


        window.location.href =
        "profile.html?user=" + newName;


    }


}




// POSTS


function createPost(){


    let username =
    getUsername();



    let text =
    document.getElementById("postText").value;



    if(text){


        let posts =
        JSON.parse(
            localStorage.getItem(
                username + "_posts"
            )
        ) || [];



        posts.push(text);



        localStorage.setItem(
            username + "_posts",
            JSON.stringify(posts)
        );



        document.getElementById("postText").value="";


        loadPosts();


    }


}




function loadPosts(){


    let username =
    getUsername();



    let posts =
    JSON.parse(
        localStorage.getItem(
            username + "_posts"
        )
    ) || [];



    let area =
    document.getElementById("posts");



    if(area){


        area.innerHTML="";


        posts.forEach(function(post){


            area.innerHTML +=

            `
            <div class="post">
            ${post}
            </div>
            `;


        });


    }


}




// FRIEND REQUEST


function addFriend(){


    let username =
    getUsername();



    alert(
        "Friend request sent to " +
        username
    );


}





document.addEventListener(
"DOMContentLoaded",
loadProfile
);
