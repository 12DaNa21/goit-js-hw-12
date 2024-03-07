const API_KEY = '28194821-49041d995ecd04735d9e20d11';
const BaseUrl = 'https://pixabay.com/api/';
export class PixabayAPI {
  #page = 1;
  #per_page = 10;
  #query = '';
 
  async getPhotos(query) {
        
    const urlGetData = `${BaseUrl}?key=${API_KEY}&q=${this.#query}&page=${this.#page}&per_page=${this.#per_page}`;
   
    const data = await fetch(urlGetData);
    
    return await data.json();
  }

  get query() {
   return this.#query;
  }

  set query(newQuery) {
    this.#query = newQuery;
  }

  incrementPage() {
    this.#page += 1;
  }

 
}