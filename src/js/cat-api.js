const catApi =
  'https://api.thecatapi.com/v1/breeds?api_key=live_lICq8CvALSqDOOGteKLfstNbQ0FFbekBPNTeXFQqaeLv7ofwBQa3owxwAO2DE2EQ';
const catInfo = 'https://api.thecatapi.com/v1/images/search';

const selectMenu = document.querySelector('.breed-select');
const loaderMsg = document.querySelector('.loader');
const errorMsg = document.querySelector('error');
const catDesc = document.querySelector('.cat-info');

function loaderHide() {
  loaderMsg.classList.add('hidden');
}
loaderHide();

function pingUrl(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          reject(errorMsg);
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
      .map(dataOne => `option value='${dataOne.id}'>${dataOne.name}</option>`)
      .join('');
    selectMenu.insertAdjacentHTML('afterbegin', userChoice);
  });
}
fetchBreeds();

function fetchCatByBreed(breedId) {
  const catUrl = `${catInfo}?breed_ids=${breedId}`;
  pingUrl(catUrl).then(data => {
    const picture = `<div><img src ="${data[0].url}" class ="cat-pic"></div>`;
    catDesc.insertAdjacentHTML('afterbegin', picture);
  });
  //   .catch(err =>{
  //     showAlert(errorInfo)
  //   });
}

function eventHandler(e) {
  catDesc.innerHTML = '';
  fetchCatByBreed(e.target.value);
}
selectMenu.addEventListener('change', eventHandler);
