import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/styles.css';
import { fetchPhoto } from './services/fetchPhoto';


// https://pixabay.com/api/?key=24319786-e6f55023f5bc4aeea2cc437aa&q=yellow+flowers&image_type=photo

const button = document.querySelector('button');
const search = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const perPage = 40;
let page = 1;
let searchQuery;
loadMoreBtn.classList.add('is-hidden');


const handleSubmit = event => {
  event.preventDefault();
  gallery.innerHTML = '';
  page = 1;
  searchQuery = event.currentTarget.searchQuery.value;
  console.log(searchQuery);
  fetchPhoto(searchQuery, page, perPage).then(photos => {
    if (photos.totalHits < perPage) {
      drawPhotos(photos);
      loadMoreBtn.classList.add('is-hidden');
      Notiflix.Notify.warning("Were sorry, but you've reached the end of search results.", {timeout: 1000})
    } else {
      drawPhotos(photos);
      console.log();
      page += 1;
      loadMoreBtn.classList.remove('is-hidden');
    }
  }).catch(error);
}

search.addEventListener('submit', handleSubmit);

loadMoreBtn.addEventListener('click', (event) => {
  event.preventDefault();
  fetchPhoto(searchQuery, page, perPage).then(photos => {
    let totalPages = photos.totalHits / perPage;
    console.log(totalPages);
    if (page >= totalPages) {
    loadMoreBtn.classList.add('is-hidden');
    Notiflix.Notify.warning("Were sorry, but you've reached the end of search results.", {timeout: 1000});
  } drawPhotos(photos)
  });
  page += 1;
  console.log(page);
  
})


function drawPhotos(photos) {
    // if (photos === undefined) {
    //     return
    // }
   const markup = photos.hits.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => 
    `<div class="photo-card">
    <a href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" style="height: 7em" loading="lazy" />
    </a>
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
  const lightbox = new SimpleLightbox('.photo-card a');
  lightbox.on('show.simplelightbox');
}


function error(error) {
  loadMoreBtn.classList.add('is-hidden');
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