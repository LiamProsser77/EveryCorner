// EveryCorner Bio System


async function saveBio(){

    const user =
    await getCurrentUser();


    if(!user){

        alert("Sign in first");

        return;

    }



    const bio =
    document.getElementById("bioInput").value.trim();



    const { error } =
    await supabaseClient
    .from("profiles")
    .update({

        bio: bio

    })
    .eq(
        "id",
        user.id
    );



    if(error){

        alert(error.message);

        return;

    }


    alert("Bio saved!");

    location.reload();

}





async function loadBio(){


    const params =
    new URLSearchParams(
        window.location.search
    );


    const username =
    params.get("user");



    const { data, error } =
    await supabaseClient
    .from("profiles")
    .select("bio")
    .eq(
        "username",
        username
    )
    .single();



    if(error){

        console.log(error);

        return;

    }



    const bio =
    document.getElementById("bio");



    if(bio){

        bio.innerHTML =
        data.bio || "No bio yet";

    }

}





window.addEventListener(
"load",
function(){

    loadBio();

});
