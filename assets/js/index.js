let nameRef = document.getElementById("pkmn-name");
let searchBtn = document.getElementById("search-btn");
let pageBody = document.getElementById("result");

//fetch data from api
let getPkmn = () =>{
    let pkmnName = nameRef.value;
    let url = `https://pokeapi.co/api/v2/pokemon/${pkmnName}`;

    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();

    if (http.status != 404){
            fetch(url)
            .then(response => response.json())
            .then((data) => {

                console.log(data);

                //elaborate the typing
                var typeString = "";
                let typeLenght = data.types.length;
                for(var i=0; i < typeLenght; i++){
                    if(i == typeLenght - 1){
                        typeString = typeString.concat(data.types[i].type.name);
                    }else{
                        typeString = typeString.concat(data.types[i].type.name, " ");
                    }
                }

                //elaborate the typing
                var abilityString = "";
                let abilityLenght = data.abilities.length;
                for(var i=0; i < abilityLenght; i++){
                    if(i == abilityLenght - 1){
                        abilityString = abilityString.concat(data.abilities[i].ability.name);
                    }else{
                        abilityString = abilityString.concat(data.abilities[i].ability.name, " ");
                    }
                }

                //building the page based on the result
                pageBody.innerHTML =`<div class="info">
                                        <div class="sprites">
                                            <img src=${data.sprites.front_default}>
                                            <img src=${data.sprites.back_default}>
                                            <img src=${data.sprites.front_shiny}>
                                            <img src=${data.sprites.back_shiny}>
                                        </div>
                                        <div class="miscellaneous">

                                            <h2 style="color:#d9bb14;">${data.name}</h2>

                                            <div class="typing">
                                                <div>${typeString.split(" ", 2).join("</div><div>")}</div>
                                            </div>

                                            
                                            <h2> Abilities: </h2>
                                            <div class="abilities">
                                                <div>${abilityString.split(" ", 3).join("</div><div>")}</div>
                                            </div>

                                            
                                        </div>
                                    `;
            })
            //error catching
            .catch(() =>{
                pageBody.innerHTML = `<h3 class="msg>Error Occured</h3>`;
                console.log(Error);
            });
        }
        //pkmn doesn't exist
        else{
            pageBody.innerHTML = `<h3 class="errorMsg">Pokémon not Found!</h3>`
        } 
    }

searchBtn.addEventListener("click", getPkmn);
window.addEventListener("load", getPkmn);
