import axios from 'axios';
import Notiflix from 'notiflix';

// https://pixabay.com/api/?key=24319786-e6f55023f5bc4aeea2cc437aa&q=yellow+flowers&image_type=photo

axios.defaults.baseURL = 'https://pixabay.com/api/';

const button = document.querySelector('button');
const search = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');

let searchQuery;
const handleSubmit = event => {
    event.preventDefault();
    searchQuery = event.currentTarget.searchQuery.value;
    console.log(searchQuery);

    fetchPhoto(searchQuery).then(drawPhotos);
};

search.addEventListener('submit', handleSubmit);



async function fetchPhoto(searchQuery) {
    // const {} = await axios.get(``);
    try {
    const {data} = await axios.get(`?key=24319786-e6f55023f5bc4aeea2cc437aa&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`);
        if (data.hits.length === 0 || searchQuery === '') {
            return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.', {timeout: 1000});
        } else { return data.hits }
    } catch (error) {
        error => console.log(error);
    }
        // .then(response => {
        //     if (!response.ok) {
        //         throw new Error(response.status);
        //     }
        //    return response.json();
        // });
};

function drawPhotos(photos) {
    if (photos === undefined) {
        return
    }
   const markup = photos.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
     return `<div class="photo-card">
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
</div>`;
    }).join('');
    gallery.innerHTML = markup;
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