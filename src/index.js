import axios from 'axios';

// https://pixabay.com/api/?key=24319786-e6f55023f5bc4aeea2cc437aa&q=yellow+flowers&image_type=photo

axios.defaults.baseURL = 'https://pixabay.com/api/';

const button = document.querySelector('button');
const search = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');

let searchQuery;
const handleSubmit = event => {
    event.preventDefault();
    // const request = event.currentTarget;
    searchQuery = event.currentTarget.searchQuery.value;
    fetchPhoto(searchQuery).then(drawPhotos).catch(error => console.log(error));
};

search.addEventListener('submit', handleSubmit);



async function fetchPhoto(searchQuery) {
    // const {} = await axios.get(``);
    const {data} = await axios.get(`?key=24319786-e6f55023f5bc4aeea2cc437aa&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`);
    return data.hits;
        // .then(response => {
        //     if (!response.ok) {
        //         throw new Error(response.status);
        //     }
        //    return response.json();
        // });
};

function drawPhotos(photos) {
    
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