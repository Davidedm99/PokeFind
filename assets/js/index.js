let nameRef = document.getElementById("pkmn-name");
let searchBtn = document.getElementById("search-btn");
let pageBody = document.getElementById("result");

//fetch data from api
let getPkmn = () =>{
    let pkmnName = nameRef.value;
    let url = `https://pokeapi.co/api/v2/pokemon/${pkmnName}`;

    //empty field
    if(pkmnName.length <= 0){
        pageBody.innerHTML = `<h3 class="msg">Please enter a Pokémon name </h3>`;
    }
    else{
        fetch(url, options)
        .then(response => response.json())
        .then((data) => {

            //pkmn doesn't exists
            if(data.result.length === 0){
                pageBody.innerHTML = `<h3 class="msg">Pokémon not Found!</h3>`
            } 

            //pkmn exists
            else{
                console.log(data.result[0]);

                //building the page based on the result
                pageBody.innerHTML =`<div class="info">
                                        <img src=${data.result[0].posterURLs.original} class="poster">
                                        <div class="miscellaneous">
                                            <h2>${data.result[0].title}</h2>
                                            <div class="rating">
                                                <img src="./assets/images/star.png">
                                                <h4>${(data.result[0].imdbRating)/10}</h4>
                                            </div>
                                            <div class="details">
                                                <span>${data.result[0].type}</span>
                                                <span>${releaseYear}</span>
                                                <span>PEGI ${data.result[0].advisedMinimumAudienceAge}</span>
                                            </div>
                                            <div class="genre">
                                                <div>${genresString.split(" ", 3).join("</div><div>")}</div>
                                            </div>
                                            <h3>Available on: </h3>
                                            <div class="stream">
                                                <div>${streamString.split(" ", 3).join("</div><div>")}</div>
                                            </div>
                                            <h3>Youtube Trailer </h3>
                                            <div class="trailer">
                                                <a href="${data.result[0].youtubeTrailerVideoLink}" target="_blank">Youtube link</a>
                                            </div>
                                        </div>
                                    </div>
                                    <h3>Plot:</h3>
                                    <p>${data.result[0].overview}</p>
                                    <h3>Cast:</h3>
                                    <p>${castString}</p>
                                    `;
            }   
        })
        //error catching
        .catch(() =>{
            pageBody.innerHTML = `<h3 class="msg>Error Occured</h3>`;
            console.log(Error);
        });
    }};

searchBtn.addEventListener("click", getPkmn);
window.addEventListener("load", getPkmn);
