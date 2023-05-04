let page = 1;

function getTopAnimes(a){
    fetch(`https://api.jikan.moe/v4/top/anime?page=${a}`)
    .then(resp=>resp.json())
    .then(data=> {
        // document.querySelector('#anime-container').innerHTML=''
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
    title.innerHTML=`Title: ${anime.title_english}`
    score.innerHTML=`Score: ${anime.score}`   
    airedFrom.innerHTML=`First Aired: ${anime.aired.from}`
    airedTo.innerHTML=`Aired Until: ${anime.aired.to}`
    document.querySelector('#anime-container').appendChild(animeCard)
}

function handleSubmit(e){
    e.preventDefault()
    input = document.querySelector('input#searchByName')
    
    fetch(`https://api.jikan.moe/v4/anime?q=${input.value}&sfw`)
    .then(resp =>resp.json())
    .then(data => {
        document.querySelector('#anime-container').innerHTML = ''
        data.data.forEach(anime=>createAnimeCard(anime))
    })
}

document.querySelector('#search-bar').addEventListener('submit',handleSubmit)

    getTopAnimes(page)