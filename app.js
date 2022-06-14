const auth = "563492ad6f91700001000001b6ba0c53901f43aea66ca7e3ed9e2513"
const next = document.querySelector(".next");
const input = document.querySelector("input");
const searchbutton = document.querySelector(".searchbutton");

let pagenr = 1;
let search = false;
let query = "";

input.addEventListener("input", (e)=>{
    e.preventDefault(); //so page doesnt reset when you press search
    query = e.target.value;
});

 // If the user presses the "Enter" key on the keyboard
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("main_search").click();
    }
  });

async function CuratedPhotos(pagenr){
    const data = await fetch(
        `https://api.pexels.com/v1/curated?per_page=15&page=${pagenr}`, 
        {
            method:"GET",
            headers:{
                Accept: "application/json",
                Authorization: auth,
            },
        }
    );
    const result = await data.json();
    result.photos.forEach(photo => {
        const pic = document.createElement("div");
        pic.innerHTML=`<img src=${photo.src.large}>
            <p>Photo: ${photo.photographer}</p>
            <a href=${photo.src.large}>Download</a>
        `;
        document.querySelector(".gallery").appendChild(pic);
    });
    //console.log(result);
}

async function SearchPhotos(query, pagenr){
    const data = await fetch(
        `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=${pagenr}`, 
        {
            method:"GET",
            headers:{
                Accept: "application/json",
                Authorization: auth,
            },
        }
    );
    const result = await data.json();
    result.photos.forEach(photo => {
        const pic = document.createElement("div");
        pic.innerHTML=`<img src=${photo.src.large}>
            <p>Photo: ${photo.photographer}</p>
            <a href=${photo.src.large}>Download</a>
        `;
        document.querySelector(".gallery").appendChild(pic);
    });
    //console.log(result);
}

searchbutton.addEventListener("click", ()=> {
    if(input.value==="")return;
    clear();
    search = true;
    SearchPhotos(query, pagenr);
    pagenr++;

});

function clear(){
    input.value="";
    document.querySelector(".gallery").innerHTML="";
    pagenr = 1;
}

next.addEventListener("click", ()=>{
    if (!search){ 
        // if we dont have any input, click next button, page will load auto next 15
        // if there is any input in the search bar, search will be true and fetch photos
        pagenr++;
        CuratedPhotos(pagenr);
    }
    else{
        if (query.value==="") return;
            pagenr++;
            SearchPhotos(query, pagenr);
    }
});
CuratedPhotos(pagenr)