// Set up main div elements
const app = document.getElementById('root');
const display = document.createElement('div');
display.setAttribute('class', 'display');
const container = document.createElement('div');
container.setAttribute('class', 'container');

// Set up child elements for display div
const h1Div = document.createElement('div');
h1Div.setAttribute('class', 'displayDiv');
let displayTitle = document.createElement('h1');
displayTitle.setAttribute('id', 'displayTitle');

const pDiv = document.createElement('div');
pDiv.setAttribute('class', 'displayDiv');
let displayText = document.createElement('p');
displayText.setAttribute('id', 'displayText');

const imgDiv = document.createElement('div');
imgDiv.setAttribute('class', 'displayDiv');
imgDiv.setAttribute('id', 'imgDiv');
let displayImage = document.createElement('img');
displayImage.setAttribute('id', 'displayImage');


//Add it all to the DOM
app.appendChild(display);
app.appendChild(container);
display.appendChild(h1Div);
display.appendChild(pDiv);
display.appendChild(imgDiv);
h1Div.appendChild(displayTitle);
pDiv.appendChild(displayText);
imgDiv.appendChild(displayImage);

const api_key = 'accd7a51a04d88e9b863d9c1702b04be';
const endpoint = 'https://api.themoviedb.org/3/discover/movie?api_key=accd7a51a04d88e9b863d9c1702b04be&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=2019';

//Variables for image links for later use
const baseURL = 'https://api.themoviedb.org/3/';
const configData = 'w500';

let url = "".concat(baseURL, 'configuration?api_key=', api_key);

fetch(endpoint)
    .then(result => result.json())
    .then((res) => {
        // LIST is the results array that I love
        const list = res.results.slice(0, 6);
        
        list.forEach(movie => {
            const card = document.createElement('div');
            card.setAttribute('class', 'card');
            card.classList.add(`${movie.id}`);

            const h1 = document.createElement('h1');
            h1.classList.add(`h1-${movie.id}`);
            h1.textContent = movie.title;

            const p = document.createElement('p');
            movie.preview = movie.overview.substring(0,100);
            p.textContent = `${movie.preview}...`;

            container.appendChild(card);

            card.appendChild(h1);
            card.appendChild(p);
        });
        
        // cardCollection is a NODELIST NOT AN ARRAY
        const cardCollection = container.querySelectorAll('.card');
        
        // All work needs to be in the fetch statement or it closes and isn't usable
        function showOnDisplay(){
            
            const identifier = this.classList[1];
            
            list.forEach(movie => {
                // Uses unique film ID to find which div has been clicked on
                const imageURL = 'https://image.tmdb.org/t/p/' + configData + movie.backdrop_path;
                
                if(movie.id == identifier){

                    uniqueOpen(identifier);
                    document.getElementById('displayTitle').textContent = movie.title;
                    document.getElementById('displayText').textContent = movie.overview;
                    
                    displayImage.setAttribute('src', `${imageURL}`);
                    displayImage.setAttribute('alt', `${movie.title} poster`)
                    
                }
            });  
        }

        //Function ensures only one div has 'open' class
        function uniqueOpen(id){ 
            cardCollection.forEach(card => {
                if(card.classList.contains(id)){
                    card.classList.add('open');
                }
                if(!card.classList.contains(id) && card.classList.contains('open')){
                     card.classList.remove('open');
                }
            });
        }  

        cardCollection.forEach(cardDiv => cardDiv.addEventListener('click', showOnDisplay));

    }).catch(function(err){
        console.log(err);
    });
