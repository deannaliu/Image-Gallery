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

async function CuratedPhotos(pagenr){
    const data = await fetch(
        `"https://api.pexels.com/v1/curated?per_page=${pagenr}"`, 
        {
            method:"GET",
            headers:{
                Accept: "application/json",
                Authorization: auth,
            },
        }
    );
    const result = await data.json();
    console.log(result);

}