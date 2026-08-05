// EveryCorner Friend System
// Search users + Instant Friends


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

        <img 
        src="${user.picture || "everycorner.png"}"
        width="50"
        height="50"
        style="border-radius:50%"
        >


        <p>

        <a href="profile.html?user=${user.username}">
        ${user.username}
        </a>

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

        alert("You cannot add yourself");

        return;

    }



    // Check if already friends

    const { data: existing } =
    await supabaseClient
    .from("friends")
    .select("*")
    .or(
        "user1.eq." + user.id +
        ",user2.eq." + user.id
    );



    const alreadyFriend =
    existing.some(friend =>

        friend.user1 === otherUserID ||
        friend.user2 === otherUserID

    );



    if(alreadyFriend){

        alert("Already friends!");

        return;

    }





    // Add friendship

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





    // Add follower

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



    alert("Friend added!");


}
