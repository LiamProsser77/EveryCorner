// EveryCorner App.js


function getUsername() {

    let params = new URLSearchParams(window.location.search);

    let username = params.get("user");


    if(username){

        localStorage.setItem(
            "everycorner_username",
            username
        );

    }


    if(!username){

        username =
        localStorage.getItem(
            "everycorner_username"
        );

    }


    return username || "New User";

}





function loadProfile(){


    let username = getUsername();


    let title =
    document.getElementById("cornerName");


    if(title){

        title.innerHTML =
        username + "'s Corner";

    }



    let picture =
    localStorage.getItem(
        username + "_picture"
    );


    if(picture){

        document.getElementById("profilePic").src =
        picture;

    }



    let banner =
    localStorage.getItem(
        username + "_banner"
    );


    if(banner){

        document.getElementById("banner").style.backgroundImage =
        "url('" + banner + "')";

    }



    loadPosts();

    showFollowers();


}





// PROFILE IMAGE

function uploadProfile(event){


    let username = getUsername();

    let file =
    event.target.files[0];


    if(file){


        let reader =
        new FileReader();



        reader.onload=function(e){


            localStorage.setItem(
                username+"_picture",
                e.target.result
            );


            document.getElementById("profilePic").src =
            e.target.result;


        };


        reader.readAsDataURL(file);


    }

}





// BANNER IMAGE

function uploadBanner(event){


    let username=getUsername();


    let file =
    event.target.files[0];


    if(file){


        let reader =
        new FileReader();



        reader.onload=function(e){


            localStorage.setItem(
                username+"_banner",
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


    let name =
    document.getElementById("nameInput").value.trim();


    if(name){


        localStorage.setItem(
            "everycorner_username",
            name
        );


        window.location.href =
        "profile.html?user=" + name;


    }


}





// POSTS

function createPost(){


    let username=getUsername();


    let text =
    document.getElementById("postText").value.trim();


    if(text){


        let posts =
        JSON.parse(
            localStorage.getItem(
                username+"_posts"
            )
        ) || [];



        posts.push(text);



        localStorage.setItem(
            username+"_posts",
            JSON.stringify(posts)
        );



        document.getElementById("postText").value="";


        loadPosts();

    }

}




function loadPosts(){


    let username=getUsername();


    let posts =
    JSON.parse(
        localStorage.getItem(
            username+"_posts"
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





// FOLLOW SYSTEM


function followUser(){


    let username=getUsername();


    let followers =
    Number(
        localStorage.getItem(
            username+"_followers"
        )
    ) || 0;



    followers++;



    localStorage.setItem(
        username+"_followers",
        followers
    );



    showFollowers();


}




function showFollowers(){


    let username=getUsername();


    let followers =
    Number(
        localStorage.getItem(
            username+"_followers"
        )
    ) || 0;



    let display =
    document.getElementById("followers");



    if(display){


        if(followers === 1){

            display.innerHTML =
            "1 Follower";

        }
        else{

            display.innerHTML =
            followers + " Followers";

        }


    }

}




window.onload = loadProfile;
