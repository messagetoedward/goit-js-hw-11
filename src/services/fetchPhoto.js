import axios from 'axios';
import Notiflix from 'notiflix';
const loadMoreBtn = document.querySelector('.load-more')

axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function fetchPhoto(searchQuery, page, perPage) {
    // const {} = await axios.get(``);
    try {
    const {data} = await axios.get(`?key=24319786-e6f55023f5bc4aeea2cc437aa&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`);
        console.log(data);
        if (data.hits.length === 0 || searchQuery === '') {
            return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.', {timeout: 1000});
        } else {
            return data;
        }
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