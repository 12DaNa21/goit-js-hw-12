import { PixabayAPI } from './js/pixabay-api';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { displayImages } from './js/render-functions';
import axios from 'axios';
const loader = document.getElementById('loader');
const gallery = document.querySelector('.gallery');
let currentPage = 1;
let searchTerm = '';

document.getElementById('searchForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchInput = document.getElementById('searchInput');

    if (searchInput) {
        currentPage = 1;
        searchTerm = searchInput.value.trim();
        gallery.innerHTML = '';
        await fetchImages(searchTerm);
    }
});

async function fetchImages(query) {
    try {
        showLoader(); 
        const response = await axios.get(`https://pixabay.com/api/?key=28194821-49041d995ecd04735d9e20d11&q=${query}&page=${currentPage}&per_page=15`);
        hideLoader(); 

        const images = response.data.hits;
        const totalHits = response.data.totalHits;

        if (images.length === 0) {
            
            displayNoResultsMessage();
            return;
        }

        displayImages(images);
        showLoadMoreButton();
        checkIfEndOfResults(totalHits);

    } catch (error) {
        hideLoader(); 
        handleError(error);
    }
}

function showLoader() {
    loader.style.display = 'block';
}

function hideLoader() {
    loader.style.display = 'none';
}

function displayNoResultsMessage() {
    iziToast.info({
        title: 'Error',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'bottomCenter',
        color: 'red',
    });
}

function showLoadMoreButton() {
    loadMoreBtn.style.display = gallery.childElementCount > 0 ? 'block' : 'none';
}

function hideLoadMoreButton() {
    loadMoreBtn.style.display = 'none';
}
function checkIfEndOfResults(totalHits) {
    const remainingResults = totalHits - currentPage * 15;
    if (remainingResults <= 0) {
        hideLoadMoreButton();
        displayEndOfResultsMessage();
    }
}

function displayEndOfResultsMessage() {
    iziToast.show({
        title: 'End of Results',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'bottomCenter',
    });
}

async function smoothScroll(distance) {
    const startY = window.scrollY;
    const startTime = performance.now();

    return new Promise((resolve) => {
        function scroll() {
            const currentTime = performance.now();
            const time = Math.min(1, (currentTime - startTime) / 500);

            window.scroll(0, easeInOutQuad(startY, distance, time));

            if (time < 1) requestAnimationFrame(scroll);
            else resolve();
        }

        function easeInOutQuad(start, end, time) {
            return start + (1 - Math.cos(Math.PI * time)) * (end - start) / 2;
        }

        requestAnimationFrame(scroll);
    });
}

loadMoreBtn.addEventListener('click', async () => {
    currentPage++;
    await fetchImages(searchTerm);
    await smoothScrollToNextGroup();
});

async function smoothScrollToNextGroup() {
    const cardHeight = document.querySelector('.gallery .card').getBoundingClientRect().height;
    await smoothScroll(window.scrollY + cardHeight);
}
