// EveryCorner App.js
// Supabase Version


// ==========================
// ACCOUNT SYSTEM
// ==========================


async function createAccount(event){

    event.preventDefault();


    let username =
    document.getElementById("username").value.trim();


    let email =
    document.getElementById("email").value.trim();


    let password =
    document.getElementById("password").value;



    const { data, error } =
    await supabaseClient.auth.signUp({

        email: email,

        password: password

    });



    if(error){

        alert(error.message);

        return;

    }



    await supabaseClient
    .from("profiles")
    .insert({

        id: data.user.id,

        username: username,

        email: email,

        picture: "everycorner.png",

        banner: "",

        followers: 0

    });



    alert("Account created!");


    window.location.href =
    "profile.html";

}





async function signIn(event){

    event.preventDefault();


    let email =
    document.getElementById("email").value;


    let password =
    document.getElementById("password").value;



    const { error } =
    await supabaseClient.auth.signInWithPassword({

        email: email,

        password: password

    });



    if(error){

        alert(error.message);

        return;

    }


    window.location.href =
    "profile.html";

}





async function logout(){

    await supabaseClient.auth.signOut();


    window.location.href =
    "signin.html";

}





async function getCurrentUser(){

    const {

        data

    } = await supabaseClient.auth.getUser();


    return data.user;

}





// ==========================
// PROFILE LOADING
// ==========================


async function loadProfile(){


    let user =
    await getCurrentUser();


    console.log(user);



    if(!user){

        document.getElementById("cornerName").innerHTML =
        "Please sign in";

        return;

    }



    let {data:profile,error} =
    await supabaseClient
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();



    if(error){

        console.log(error);

        return;

    }



    document.getElementById("cornerName")
    .innerHTML =
    profile.username + "'s Corner";



    document.getElementById("profilePic")
    .src =
    profile.picture;



    if(profile.banner){

        document.getElementById("banner")
        .style.backgroundImage =
        "url('" + profile.banner + "')";

    }



    showFollowers(profile.followers);

    loadPosts(profile.username);


}

// ==========================
// PROFILE UPLOADS
// ==========================


async function uploadProfile(event){

    let file =
    event.target.files[0];


    if(!file){

        return;

    }


    let user =
    await getCurrentUser();


    let reader =
    new FileReader();



    reader.onload = async function(e){


        await supabaseClient
        .from("profiles")
        .update({

            picture:e.target.result

        })

        .eq("id",user.id);



        document.getElementById("profilePic")
        .src =
        e.target.result;


    };


    reader.readAsDataURL(file);

}





async function uploadBanner(event){


    let file =
    event.target.files[0];


    if(!file){

        return;

    }



    let user =
    await getCurrentUser();



    let reader =
    new FileReader();



    reader.onload = async function(e){


        await supabaseClient
        .from("profiles")
        .update({

            banner:e.target.result

        })

        .eq("id",user.id);



        document.getElementById("banner")
        .style.backgroundImage =
        "url('" + e.target.result + "')";


    };



    reader.readAsDataURL(file);


}





// ==========================
// CHANGE NAME
// ==========================


async function saveProfile(){


    let name =
    document.getElementById("nameInput")
    .value.trim();



    if(!name){

        return;

    }



    let user =
    await getCurrentUser();



    await supabaseClient
    .from("profiles")
    .update({

        username:name

    })

    .eq("id",user.id);



    window.location.href =
    "profile.html";

}





// ==========================
// POSTS
// ==========================


async function createPost(){


    let text =
    document.getElementById("postText")
    .value.trim();



    if(!text){

        return;

    }



    let user =
    await getCurrentUser();



    let {data:profile} =
    await supabaseClient
    .from("profiles")
    .select("username")
    .eq("id",user.id)
    .single();



    await supabaseClient
    .from("posts")
    .insert({

        username:profile.username,

        content:text

    });



    document.getElementById("postText")
    .value="";


    loadPosts(profile.username);


}





async function loadPosts(username){


    let {data:posts} =
    await supabaseClient
    .from("posts")
    .select("*")
    .eq("username",username)
    .order("created_at",
    {
        ascending:false
    });



    let area =
    document.getElementById("posts");



    if(!area){

        return;

    }



    area.innerHTML="";



    posts.forEach(function(post){


        area.innerHTML +=

        `
        <div class="post">
        ${post.content}
        </div>
        `;


    });


}





// ==========================
// FOLLOW SYSTEM
// ==========================


async function followUser(){


    let user =
    await getCurrentUser();



    if(!user){

        alert("Sign in first");

        return;

    }



    let params =
    new URLSearchParams(
        window.location.search
    );


    let profileID =
    params.get("id");



    if(!profileID){

        alert("User not found");

        return;

    }



    if(profileID === user.id){

        alert("You cannot follow yourself");

        return;

    }



    await supabaseClient
    .from("followers")
    .insert({

        follower:user.id,

        following:profileID

    });



    alert("Followed!");

}





function showFollowers(count){


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




// ==========================
// USER SEARCH
// ==========================


async function searchUsers(){

    let search =
    document.getElementById("searchUsers").value.trim();


    let results =
    document.getElementById("searchResults");


    if(!search){

        results.innerHTML="";
        return;

    }



    let {data:users,error} =
    await supabaseClient
    .from("profiles")
    .select("id, username")
    .ilike("username","%" + search + "%")
    .limit(5);



    if(error){

        console.log(error);
        return;

    }



    results.innerHTML="";



    users.forEach(function(user){


        results.innerHTML += `

        <div class="post">

        ${user.username}

        <button onclick="sendJoinRequest('${user.id}')">

        Ask to Join Corner

        </button>

        </div>

        `;


    });


}





// ==========================
// SEND JOIN REQUEST
// ==========================


async function sendJoinRequest(receiverID){


    let current =
    await getCurrentUser();



    if(!current){

        alert("Sign in first");

        return;

    }



    if(current.id === receiverID){

        alert("You cannot request yourself");

        return;

    }



    await supabaseClient
    .from("join_requests")
    .insert({

        sender:current.id,

        receiver:receiverID,

        status:"pending"

    });



    alert("Request sent!");

}

window.onload=function(){

    if(
        document.getElementById("cornerName")
    ){

        loadProfile();

    }

};
