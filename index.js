let page = 1;

function getTopAnimes(a){
    fetch(`https://api.jikan.moe/v4/top/anime?page=${a}`)
    .then(resp=>resp.json())
    .then(data=> {
        document.querySelector('#anime-container').innerHTML=''
        data.data.forEach(anime => console.log(anime));
    })
}