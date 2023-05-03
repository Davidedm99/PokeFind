let nameRef = document.getElementById("pkmn-name");
let searchBtn = document.getElementById("search-btn");
let pageBody = document.getElementById("result");

let typePath = "./assets/images/types/";


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
                let baseHp = (data.stats[0].base_stat) * 100 / 255;
                //real max value is 190
                let baseAtk = (data.stats[1].base_stat) * 100 / 255;
                //real max value is 250
                let baseDef = (data.stats[2].base_stat) * 100 / 255;
                //real max value is 194
                let baseSpA = (data.stats[3].base_stat) * 100 / 255;
                //real max value is 250
                let baseSpD = (data.stats[4].base_stat) * 100 / 255;
                //real max value is 200
                let baseSpe = (data.stats[5].base_stat) * 100 / 255;
                let baseOverall = 0;

                for(var i=0; i < 6; i++){
                    baseOverall = baseOverall + data.stats[i].base_stat;
                };

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
                                                <img src=${typePath + data.types[0].type.name}.png> 
                                                ${typeLenght===2 ? 
                                                    `<img src=${typePath + data.types[1].type.name}.png>` :
                                                ''}
                                            </div>

                                            <h3> Abilities: </h3>
                                            <div class="abilities">
                                                <div>${abilityString.split(" ", 3).join("</div><div>")}</div>
                                            </div>
                                        </div>

                                        <div class="table">
                                            <table class="statsTable">
                                                <tbody>
                                                    <tr>
                                                        <th colspan="2">Base Stats</th>
                                                    </tr>
                                                    <tr>
                                                        <td style="width: 3.5em; padding: 0.3ex 0.8ex; border-radius: 5px 0 0 0; background: #E1FFD3;">
                                                            <span style="color:#008000; font-weight: bold;">Hp</span>
                                                        </td>
                                                        <td style="padding: 0.3ex 0.8ex 0.3ex 1.8ex; border-radius: 0 5px 0 0; min-width: 9em; background: #E1FFD3;">
                                                            <div style="width:${baseHp}%; 
                                                                        border-radius: 0 8px 8px 0; 
                                                                        background-size: 100%;
                                                                        background-image: -webkit-linear-gradient(left, #E1FFD3, #58E810); 
                                                                        background-image: linear-gradient(to right, #E1FFD3, #58E810);">
                                                                <b style="color:#006400;">${data.stats[0].base_stat}</b>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="width: 3.5em; padding: 0.3ex 0.8ex; background: #FFFBE6;">
                                                            <span style="color:#C4342D; font-weight: bold;">Atk</span>
                                                        </td>
                                                        <td style="padding: 0.3ex 0.8ex 0.3ex 1.8ex; min-width: 9em; background: #FFFBE6;">
                                                            <div style="width:${baseAtk}%; 
                                                                        border-radius: 0 8px 8px 0; 
                                                                        background-size: 100%;
                                                                        background-image: -webkit-linear-gradient(left, #FFFBE6, #FF9494); 
                                                                        background-image: linear-gradient(to right, #FFFBE6, #FF9494);">
                                                                <b style="color:#8B0000;">${data.stats[1].base_stat}</b>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="width: 3.5em; padding: 0.3ex 0.8ex; background: #9EB5FF;">
                                                            <span style="color:#0066BC; font-weight: bold;">Def</span>
                                                        </td> 
                                                        <td style="padding: 0.3ex 0.8ex 0.3ex 1.8ex; min-width: 9em; background: #9EB5FF;">
                                                            <div style="width:${baseDef}%; 
                                                                        border-radius: 0 8px 8px 0; 
                                                                        background-size: 100%;
                                                                        background-image: -webkit-linear-gradient(left, #9EB5FF, #4C6CD4); 
                                                                        background-image: linear-gradient(to right, #9EB5FF, #4C6CD4);">
                                                                <b style="color:#0A163D;">${data.stats[2].base_stat}</b>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="width: 3.5em; padding: 0.3ex 0.8ex; background: #FFE4C4;">
                                                            <span style="color:#FF8800; font-weight: bold;">SpA</span>
                                                        </td>
                                                        <td style="padding: 0.3ex 0.8ex 0.3ex 1.8ex; min-width: 9em; background: #FFE4C4;">
                                                        <div style="width:${baseSpA}%; 
                                                                    border-radius: 0 8px 8px 0; 
                                                                    background-size: 100%;
                                                                    background-image: -webkit-linear-gradient(left, #FFE4C4, #E48E45); 
                                                                    background-image: linear-gradient(to right, #FFE4C4, #E48E45);">
                                                            <b style="color:#F67200;">${data.stats[3].base_stat}</b>
                                                        </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="width: 3.5em; padding: 0.3ex 0.8ex; background: #AFEEEE;">
                                                            <span style="color:#37C4C0; font-weight: bold;">SpD</span>
                                                        </td>
                                                        <td style="padding: 0.3ex 0.8ex 0.3ex 1.8ex; min-width: 9em; background: #AFEEEE;">
                                                        <div style="width:${baseSpD}%; 
                                                                    border-radius: 0 8px 8px 0; 
                                                                    background-size: 100%;
                                                                    background-image: -webkit-linear-gradient(left, #AFEEEE, #48D1CC); 
                                                                    background-image: linear-gradient(to right, #AFEEEE, #48D1CC);">
                                                            <b style="color:#368683;">${data.stats[4].base_stat}</b>
                                                        </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="width: 3.5em; padding: 0.3ex 0.8ex; border-radius: 0 0 0 5px; background: #C4B7D3;">
                                                            <span style="color:#7B59A4; font-weight: bold;">Spe</span>
                                                        </td>
                                                        <td style="padding: 0.3ex 0.8ex 0.3ex 1.8ex; border-radius: 0  0 5px 0; min-width: 9em; background: #C4B7D3;">
                                                            <div style="width:${baseSpe}%; 
                                                                        border-radius: 0 8px 8px 0; 
                                                                        background-size: 100%;
                                                                        background-image: -webkit-linear-gradient(left, #C4B7D3, #7C609C); 
                                                                        background-image: linear-gradient(to right, #C4B7D3, #7C609C);">
                                                                <b style="color:#624783;">${data.stats[5].base_stat}</b>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="width: 3.5em; background: transparent;">
                                                            <span font-weight: bold;">Overall</span>
                                                        </td>
                                                        <td style="padding: 0.3ex 0.8ex 0.3ex 1.8ex; min-width: 9em; background: transparent;">
                                                            <div style="width:100%; background-size: 100%;">
                                                                <b>${baseOverall}</b>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
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

