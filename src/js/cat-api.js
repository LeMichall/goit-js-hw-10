const catApi =
  'https://api.thecatapi.com/v1/breeds?api_key=live_lICq8CvALSqDOOGteKLfstNbQ0FFbekBPNTeXFQqaeLv7ofwBQa3owxwAO2DE2EQ';
const catInfo = 'https://api.thecatapi.com/v1/images/search';
let loading;
let errorInfo;
const selectMenu = document.querySelector('.breed-select');
loading = document.querySelector('.loader');
errorInfo = document.querySelector('.error');
const catDesc = document.querySelector('.cat-info');

function hideAlert(loader) {
  loader.classList.add('hidden');
}
function showAlert(loader) {
  loader.classList.remove('hidden');
}

function pingUrl(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          reject(errorInfo);
        } else return response.json();
      })
      .then(data => {
        resolve(data);
      })
      .catch(err => reject(err));
  });
}
function fetchBreeds() {
  pingUrl(catApi).then(data => {
    const userChoice = data
      .map(dataOne => `<option value='${dataOne.id}'>${dataOne.name}</option>`)
      .join('');
    selectMenu.insertAdjacentHTML('afterbegin', userChoice);
  });
}

function fetchCatByBreed(breedId) {
  const catUrl = `${catInfo}?breed_ids=${breedId}`;
  pingUrl(catUrl)
    .then(data => {
      const picture = `<div><img src ="${data[0].url}" class ="cat-pic"></div>`;
      catDesc.insertAdjacentHTML('afterbegin', picture);
    })
    .catch(err => {
      showAlert(errorInfo);
    });
  const catChoice = `https://api.thecatapi.com/v1/breeds/${breedId}`;
  pingUrl(catChoice)
    .then(data => {
      const catParagraph = `<div class = "cat-txt"><h1>${data.name}</h1><p>${data.description}</p><h2>Temperament</h2>${data.temperament}</p></div>`;
      catDesc.insertAdjacentHTML('beforeend', catParagraph);
    })
    .catch(err => {
      showAlert(errorInfo);
    });
}

function eventHandler(e) {
  hideAlert(errorInfo);
  showAlert(loading);
  catDesc.innerHTML = '';
  fetchCatByBreed(e.target.value);
  setTimeout(() => {
    hideAlert(loading);
  }, 500);
}
hideAlert(loading);
hideAlert(errorInfo);
fetchBreeds();
selectMenu.addEventListener('change', eventHandler);
