// EveryCorner Friend System


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
    .select("id, username, picture")
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

        <button onclick="sendFriendRequest('${user.id}')">
        Add Friend
        </button>

        <a href="profile.html?user=${user.username}">
        View Corner
        </a>

        `;


        results.appendChild(box);


    });


}





// ==========================
// SEND FRIEND REQUEST
// ==========================

async function sendFriendRequest(receiverID){


    const current =
    await getCurrentUser();



    if(!current){

        alert("Sign in first");

        return;

    }



    if(current.id === receiverID){

        alert("You cannot add yourself");

        return;

    }



    const { error } =
    await supabaseClient
    .from("join_requests")
    .insert({

        sender:current.id,

        receiver:receiverID,

        status:"pending"

    });



    if(error){

        alert(error.message);

        return;

    }



    alert("Friend request sent!");

}
