// EveryCorner Posts System
// Handles creating and loading posts


// ==========================
// CREATE POST
// ==========================

async function createPost(){


    const user =
    await getCurrentUser();



    if(!user){

        alert("Sign in first");

        return;

    }



    const text =
    document.getElementById("postText").value.trim();



    if(text === ""){

        alert("Write something first");

        return;

    }



    const { data: profile, error: profileError } =
    await supabaseClient
    .from("profiles")
    .select("username")
    .eq(
        "id",
        user.id
    )
    .single();



    if(profileError){

        console.log(profileError);

        return;

    }





    const { error } =
    await supabaseClient
    .from("posts")
    .insert({

        username: profile.username,

        content:text

    });



    if(error){

        alert(error.message);

        return;

    }



    alert("Post created!");

    location.reload();

}





// ==========================
// LOAD POSTS
// ==========================

async function loadPosts(){


    const posts =
    document.getElementById("posts");



    if(!posts){

        return;

    }



    const { data, error } =
    await supabaseClient
    .from("posts")
    .select("*")
    .order(
        "created_at",
        {
            ascending:false
        }
    );



    if(error){

        console.log(error);

        return;

    }



    posts.innerHTML = "";



    data.forEach(post => {


        const box =
        document.createElement("div");


        box.className = "post";


        box.innerHTML = `

        <h3>
        ${post.username}
        </h3>

        <p>
        ${post.content}
        </p>

        `;


        posts.appendChild(box);


    });


}





// ==========================
// START
// ==========================

window.addEventListener(
"load",
function(){

    loadPosts();

});
