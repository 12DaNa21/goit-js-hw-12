import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
const lightbox = new SimpleLightbox('.gallery a', {
    scaleImageToRatio: true,
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250
});


let totalHits = 0;
export async function displayImages(images) {
    if (images.length === 0) {
        iziToast.show({
            title: 'Error',
            message: 'Sorry, there are no images matching your search query. Please try again!',
            color: 'red',
        });
        return;
    }

    images.forEach(image => {
        const cardHTML = `
            <div class="card">
                <a href="${image.webformatURL}">
                    <img src="${image.webformatURL}" alt="${image.tags}">
                </a>
                <p>Likes: ${image.likes}</p>
                <p>Views: ${image.views}</p>
                <p>Comments: ${image.comments}</p>
                <p>Downloads: ${image.downloads}</p>
            </div>
        `;

        gallery.insertAdjacentHTML('beforeend', cardHTML);

        const imgElement = gallery.lastElementChild.querySelector('img');
        imgElement.addEventListener('click', () => {
            lightbox.open({
                items: [{ src: image.largeImageURL, title: image.tags }],
            });
        });
    });
    totalHits = images[0].totalHits || 0;
    lightbox.refresh();
   
}

