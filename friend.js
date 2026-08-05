// EveryCorner Friend System
// Instant Friends + Followers


// ==========================
// SEARCH USERS
// ==========================

async function searchUsers(){


    const search =
    document.getElementById("searchUsers").value.trim();


    const results =
    document.getElementById("searchResults");


    if(search === ""){

        results.innerHTML = "";

        return;

    }



    const { data, error } =
    await supabaseClient
    .from("profiles")
    .select(
        "id, username, picture"
    )
    .ilike(
        "username",
        "%" + search + "%"
    )
    .limit(10);



    if(error){

        console.log(error);

        return;

    }



    results.innerHTML = "";



    data.forEach(user => {


        const box =
        document.createElement("div");


        box.innerHTML = `

        <p>
        ${user.username}
        </p>

        <button onclick="addFriend('${user.id}')">
        Add Friend
        </button>

        `;


        results.appendChild(box);


    });


}





// ==========================
// ADD FRIEND
// ==========================

async function addFriend(otherUserID){


    const user =
    await getCurrentUser();



    if(!user){

        alert("Sign in first");

        return;

    }



    if(user.id === otherUserID){

        alert(
            "You cannot add yourself"
        );

        return;

    }



    // Create friendship

    const { error: friendError } =
    await supabaseClient
    .from("friends")
    .insert({

        user1:user.id,

        user2:otherUserID

    });



    if(friendError){

        alert(friendError.message);

        return;

    }




    // Create follower connection

    const { error: followError } =
    await supabaseClient
    .from("followers")
    .insert({

        follower:user.id,

        following:otherUserID

    });



    if(followError){

        console.log(followError);

    }



    alert(
        "Friend added!"
    );


    location.reload();


}
