const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

//Unsplash API
const count = 10;
const apiKey ='adMDW8ghSMGg68upthQ1ABugV0RlSmH3tQcuWLBcZmc';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


//Create Elements For Links & Photos , Add to the document
function displayPhotos() {
    //Function for each method
    photosArray.forEach((photo) => {
        //Create an anchor element to link to Unsplash API
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');
        // Create image for photo
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt',photo.alt_description);
        img.setAttribute('title',photo.alt_title);
        //Put the img inside the a, then put both inside the imageContainer element
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

// On Load
getPhotos();