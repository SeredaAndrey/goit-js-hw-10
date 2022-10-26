import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

import RestCountriesService from './js/fetchCountries';
import refs from './js/refs';

import fullinfoCountrie from './templates/fullinfoCountrie.hbs';
import listCountries from './templates/listCountries.hbs';

import './css/styles.css';

const restCountriesService = new RestCountriesService();

const DEBOUNCE_DELAY = 300;

refs.inputForm.addEventListener(
  'input',
  debounce(evt => {
    requestLengthCheck(evt);
    // inputValidation(evt);
  }, DEBOUNCE_DELAY)
);

function requestLengthCheck(event) {
  if (normalizeText(event.target.value).length === 0) {
    clearDoom();
    return;
  }
  inputValidation(event);
}

function inputValidation(event) {
  restCountriesService.query = normalizeText(event.target.value);
  restCountriesService
    .fetchArticles()
    .then(changeMarkup)
    .catch(error => {
      console.log(error);
    });
}

function insertMarkup(callbackFunction) {
  refs.countryList.insertAdjacentHTML('beforeend', callbackFunction);
}

function clearDoom() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

function changeMarkup(articles) {
  clearDoom();
  if (articles.status === 404 || articles.message === 'Page Not Found') {
    failureMesage();
    return;
  }
  if (articles.length > 10) {
    infoMesage(articles.length);
  } else if (articles.length > 1) {
    insertMarkup(listCountries(articles));
  } else {
    insertMarkup(fullinfoCountrie(articles));
  }
}

function failureMesage() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}
function infoMesage(number) {
  Notiflix.Notify.info(
    `Too many matches found. Please enter a more specific name. Founding ${number} countries.`
  );
}
function normalizeText(text) {
  return text.trim();
}
