import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";

const lightbox = new SimpleLightbox('.gallery a', {
    scaleImageToRatio: true,
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250
});


let totalHits = 0;
export async function displayImages(images) {


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

       
    });
    totalHits = images[0].totalHits || 0;
    lightbox.refresh();
   
}

