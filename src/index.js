import axios from 'axios';
import Notiflix from 'notiflix';
import './css/styles.css'
import { fetchPhoto } from './services/fetchPhoto';

// https://pixabay.com/api/?key=24319786-e6f55023f5bc4aeea2cc437aa&q=yellow+flowers&image_type=photo

const button = document.querySelector('button');
const search = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more')
let page = 1;
let searchQuery;
loadMoreBtn.classList.add('is-hidden');


const handleSubmit = event => {
    event.preventDefault();
  gallery.innerHTML = '';
  page = 1;
    searchQuery = event.currentTarget.searchQuery.value;
    console.log(searchQuery);
        fetchPhoto(searchQuery, page).then(photos => {
        drawPhotos(photos);
        page += 1;
        loadMoreBtn.classList.remove('is-hidden');
    });
}

search.addEventListener('submit', handleSubmit);

loadMoreBtn.addEventListener('click', (event) => {
    event.preventDefault();
    fetchPhoto(searchQuery, page).then(photos => drawPhotos(photos));
    page += 1;
    console.log(page);
})


function drawPhotos(photos) {
    if (photos === undefined) {
        return
    }
   const markup = photos.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => 
    `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" style="height: 7em" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>`).join('');
    gallery.insertAdjacentHTML('beforeend', markup);
}

function error(error) {
    console.log(error);
}

const parameters = {
    // q - термин для поиска. То, что будет вводить пользователь.
    // image_type - тип изображения. Мы хотим только фотографии, поэтому задай значение photo.
    // orientation - ориентация фотографии. Задай значение horizontal.
    // safesearch - фильтр по возрасту. Задай значение true
};

// webformatURL - ссылка на маленькое изображение для списка карточек.
// largeImageURL - ссылка на большое изображение.
// tags - строка с описанием изображения. Подойдет для атрибута alt.
// likes - количество лайков.
// views - количество просмотров.
// comments - количество комментариев.
// downloads - количество загрузок.