const toggleSwitch = document.querySelector('input[type="checkbox"]');
const toggleIcon = document.getElementById('toggle-icon');

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Dark or Light Images
function imageMode(color) {
    
}


//Toggle Switch Function
function toggleDarkLightMode(isDark){
  
    toggleIcon.children[0].textContent= isDark ? "Dark Mode" : "Light Mode" ;
    isDark ? toggleIcon.children[1].classList.replace('fa-sun','fa-moon') :
      toggleIcon.children[1].classList.replace('fa-moon','fa-sun');
    isDark ? imageMode('dark') : imageMode('light');
}

//Switch Theme Dynamically
function switchTheme(event){
    if (event.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        toggleDarkLightMode(true);
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        toggleDarkLightMode(false);
    }
}

//Event Listener
toggleSwitch.addEventListener('change', switchTheme);

//Check local storage for theme changes
const currentTheme = localStorage.getItem('theme');
if(currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
        toggleDarkLightMode(true);
    }
}




//Unsplash API
const count = 30;
const apiKey ='adMDW8ghSMGg68upthQ1ABugV0RlSmH3tQcuWLBcZmc';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }

}

//Create Elements For Links & Photos , Add to the document
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;

    //Function for each method
    photosArray.forEach((photo) => {
        //Create an anchor element to link to Unsplash API
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');
        // Create image for photo
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('name', photo.user.name);
        img.setAttribute('alt',photo.username);
        img.setAttribute('title',photo.alt_title);
  
        //Put the img inside the a, then put both inside the imageContainer 

        img.addEventListener('load', imageLoaded);
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//Get  photos from Unsplash API

async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }catch(error){
        //Catches error
    }
}

//Check to see if scrolling is near the bottom of the page
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();  
    }

});

// On Load
getPhotos();