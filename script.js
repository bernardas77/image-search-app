const ACCESS_KEY = 'KS9kSZbgo3oV7F35RN5_CG6QP09qLw4CgO2GG2r18rw';

const formEl = document.querySelector('form');
const inputEl = document.getElementById('search-input');
const showMore = document.getElementById('show-more-button');
const searchResults = document.createElement('div');
searchResults.classList.add("search-results");
document.body.appendChild(searchResults);
const button = document.createElement('button');
button.setAttribute("id", "show-more-button");
button.innerHTML = "Show more";
document.body.appendChild(button);

let inputData = '';
let page = 1;
let homePageNum = Math.round(((Math.random()+1)*10));

async function searchImages() {
  button.style.display = 'block';
  inputData = inputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${ACCESS_KEY}&per_page=9`;

  const response = await fetch(url);
  const data = await response.json();
  const results = data.results;

  if (page === 1){
    searchResults.innerHTML = '';
  }

  results.map((result) =>{
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add("search-result");
    const image = document.createElement('img');
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement('a');
    imageLink.classList.add('text');
    imageLink.href = result.links.html;
    imageLink.target = '_blank';
    imageLink.textContent = result.alt_description;
    const clickable = document.createElement('a');
    clickable.href = result.urls.regular;
    clickable.target = '_blank';

    clickable.appendChild(image);
    imageWrapper.appendChild(clickable);
    imageWrapper.appendChild(imageLink);
    searchResults.appendChild(imageWrapper);
 });

 page++;
}

async function homePage() {
  button.style.display = 'none';
  const perPage = 30; // max - 30
  const url = `https://api.unsplash.com/photos?client_id=${ACCESS_KEY}&page=${homePageNum}&per_page=${perPage}`;
  homePageNum++;
  const response = await fetch(url);
  const data = await response.json();
  const results = data;

  searchResults.innerHTML = '';

  results.map((result) =>{
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add("search-result");
    const image = document.createElement('img');
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement('a');
    imageLink.classList.add('text');
    imageLink.href = result.links.html;
    imageLink.target = '_blank';
    imageLink.textContent = result.alt_description;
    const clickable = document.createElement('a');
    clickable.href = result.urls.regular;
    clickable.target = '_blank';

    clickable.appendChild(image);
    imageWrapper.appendChild(clickable);
    imageWrapper.appendChild(imageLink);
    searchResults.appendChild(imageWrapper);
 });
}


formEl.addEventListener('submit', (event) =>{
  event.preventDefault();
  page = 1;
  searchImages(); 
})

button.addEventListener('click', () =>{
  searchImages(); 
})

document.addEventListener('DOMContentLoaded', () => {
  homePage();
})

document.querySelector('h1').addEventListener('click', () => {
  homePage();
})
