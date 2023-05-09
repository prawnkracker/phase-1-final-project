let page = 1;

function getTopAnimes(a){
    fetch(`https://api.jikan.moe/v4/top/anime?page=${a}`)
    .then(resp=>resp.json())
    .then(data=> {
        document.querySelector('#anime-container').innerHTML=''
        data.data.forEach(anime => createAnimeCard(anime));
    })
}



function createAnimeCard(anime){
    let animeCard = document.createElement('div'),
    close = document.createElement('div'),
    btn = document.createElement('button'),
    img = document.createElement('img'),
    title = document.createElement('h2'),
    score = document.createElement('p'),
    airedFrom = document.createElement('p'),
    airedTo = document.createElement('p');
    animeCard.classList.add('anime')
    close.classList.add('close-div')
    btn.classList.add('close-button')
    btn.innerHTML='x'
    title.classList.add('anime-title')
    animeCard.append(close);
    close.append(btn);
    animeCard.append(img);
    animeCard.append(title);
    animeCard.append(score);
    animeCard.append(airedFrom);
    animeCard.append(airedTo);
    btn.textContent='X'
    img.src=`${anime.images.jpg.image_url}`;
    title.innerHTML=`<span class='color'>Title: </span>${anime.title_english ? anime.title_english : anime.title_japanese}`
    score.innerHTML=`<span class='color'>Score: </span>${anime.score}`   
    airedFrom.innerHTML=`<span class='color'>First Aired: </span>${anime.aired.from.slice(0,10)}`
    airedTo.innerHTML=`<span class='color'>Aired Until: </span>${anime.aired.to ? anime.aired.to.slice(0,10) : 'Current'}`
    document.querySelector('#anime-container').appendChild(animeCard)
    btn.addEventListener('click', handleDelete)
}

function handleDelete(e){
    e.target.parentNode.parentNode.remove()
}

function handleSubmit(e){
    e.preventDefault()
    input = document.querySelector('input#searchByName')
    let back = document.querySelector('#back')
    let forward = document.querySelector('#forward')
    if(back){
        back.style.display='none';
    }    
    if(forward){
        forward.style.display='none';
    }
    fetch(`https://api.jikan.moe/v4/anime?q=${input.value}&sfw`)
    .then(resp =>resp.json())
    .then(data => {
        document.querySelector('#anime-container').innerHTML = ''
        data.data.forEach(anime=>createAnimeCard(anime))
    })
    document.querySelector('#search-bar').reset()
}

document.querySelector('#search-bar').addEventListener('submit',handleSubmit)

function addNavListeners(){
    let buttonContainer = document.querySelector('#buttons')
    let back = document.createElement('button'),
    forward = document.createElement('button'),
    refresh = document.createElement('button');
    back.id = 'back';
    forward.id = 'forward';
    refresh.id = 'refresh';
    back.innerHTML = '←';
    forward.innerHTML = '→';
    refresh.innerHTML = '↻';
    buttonContainer.append(back);
    buttonContainer.append(forward);
    buttonContainer.append(refresh)
    back.addEventListener('click', pageDown)
    forward.addEventListener('click', pageUp)
    refresh.addEventListener('click', resetPage)
}
function pageUp(){
    page++
    getTopAnimes(page)
}

function pageDown(){
    if(page>1){
        page--
        return getTopAnimes(page)
    } else{
        alert('First Page')
    }
}

function initialize(){
    getTopAnimes(page), handleSubmit, addNavListeners()
}

function resetPage(){
    page=1
    getTopAnimes(page)
    back.style.display = 'inline-block';
    forward.style.display = 'inline-block';
}

initialize()