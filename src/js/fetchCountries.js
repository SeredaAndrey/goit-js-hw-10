const BASE_URL = 'https://restcountries.com/v2';

export default class RestCountriesService {
  constructor() {
    this.searchQuery = '';
  }
  fetchArticles() {
    const url = `${BASE_URL}/name/${this.searchQuery}?fields=name,capital,population,flags,languages`;
    return fetch(url)
      .then(responce => responce.json())
      .then(articles => articles);
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
