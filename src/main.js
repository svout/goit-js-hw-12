import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import axios from 'axios';

const loader = document.querySelector('.loader');
loader.style.display = 'none';

let currentPage = 1;
let currentQuery = '';
let maxImages = 0;

const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const imageGallery = document.getElementById('imageGallery');
const loadMoreBtn = document.getElementById('loadMoreBtn');

loadMoreBtn.style.display = 'none'; 


function getCardHeight() {
    const card = document.querySelector('.card');
    const cardRect = card.getBoundingClientRect();
    return cardRect.height;
}

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const query = searchInput.value.trim();

    if (query === "") {
        iziToast.error({
            title: 'Error',
            message: 'Please enter a search query.',
            position:'topRight'
        });
        return;
    }

    loader.style.display = 'inline-block';
    currentQuery = query;
    currentPage = 1;

    try {
        const apiKey = '42374416-80395e50359da313800ed9b7e';
        const response = await axios.get(`https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=15`);
        
        loader.style.display = 'none';
        const data = response.data;

        maxImages = data.totalHits;

        if (data.hits.length === 0) {
            iziToast.error({
                title: 'Error',
                message: 'Sorry, there are no images matching your search query. Please try again.',
                position: 'topRight'
            });
        } else {
            imageGallery.innerHTML = '';

            data.hits.forEach(image => {
                const card = document.createElement('div');
                card.classList.add('card');

                const link = document.createElement('a');
                link.href = image.largeImageURL;
                link.classList.add('gallery-link'); 

                const img = document.createElement('img');
                img.src = image.webformatURL;
                img.alt = image.tags;

                const details = document.createElement('div');
                details.classList.add('details');
                details.innerHTML = `
                    <p>Likes: ${image.likes}</p>
                    <p>Views: ${image.views}</p>
                    <p>Comments: ${image.comments}</p>
                    <p>Downloads: ${image.downloads}</p>
                `;

                link.appendChild(img);
                card.appendChild(link);
                card.appendChild(details)

                imageGallery.appendChild(card);
            });

            const lightbox = new SimpleLightbox('.gallery-link'); 
            lightbox.refresh();

            if (imageGallery.childElementCount < maxImages) {
                loadMoreBtn.style.display = 'block'; 
            }
            window.scrollBy({
                top: getCardHeight() * 2,
                behavior: 'smooth'
            });
        }
    } catch (error) {
        console.log('Error fetching data:', error);
        loader.style.display = 'none';
        iziToast.error({
            title: 'Error',
            message: 'An error occurred while fetching data. Please try again later.',
            position:'topRight'
        });
    }
});

loadMoreBtn.addEventListener('click', async () => {
    currentPage++;

    loader.style.display = 'inline-block';

    try {
        const apiKey = '42374416-80395e50359da313800ed9b7e';
        const response = await axios.get(`https://pixabay.com/api/?key=${apiKey}&q=${currentQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=15`);
        
        loader.style.display = 'none';
        const data = response.data;

        if (data.hits.length === 0) {
            iziToast.error({
                title: 'Error',
                message: 'Sorry, there are no more images to load.',
                position: 'topRight'
            });
            loadMoreBtn.style.display = 'none'; 
            return; 
        } else {
            data.hits.forEach(image => {
                const card = document.createElement('div');
                card.classList.add('card');

                const link = document.createElement('a');
                link.href = image.largeImageURL;
                link.classList.add('gallery-link'); 

                const img = document.createElement('img');
                img.src = image.webformatURL;
                img.alt = image.tags;

                const details = document.createElement('div');
                details.classList.add('details');
                details.innerHTML = `
                    <p>Likes: ${image.likes}</p>
                    <p>Views: ${image.views}</p>
                    <p>Comments: ${image.comments}</p>
                    <p>Downloads: ${image.downloads}</p>
                `;

                link.appendChild(img);
                card.appendChild(link);
                card.appendChild(details)

                imageGallery.appendChild(card);
            });

            const lightbox = new SimpleLightbox('.gallery-link'); 
            lightbox.refresh();

            if (imageGallery.childElementCount < maxImages) {
                loadMoreBtn.style.display = 'block';
            } else {
                loadMoreBtn.style.display = 'none';
                iziToast.info({
                    title: 'End of Search Results',
                    message: "We're sorry, but you've reached the end of search results.",
                    position:'topRight'
                });
            }
            window.scrollBy({
                top: getCardHeight() * 2,
                behavior: 'smooth'
            });
        }
    } catch (error) {
        console.log('Error fetching data:', error);
        loader.style.display = 'none';
        iziToast.error({
            title: 'Error',
            message: 'An error occurred while fetching data. Please try again later.',
            position:'topRight'
        });
    }
});
