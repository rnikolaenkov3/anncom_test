const container = document.querySelector('.anncom-container');
const btnAdd = container.querySelector('.anncom-container__add');
const btnClear = container.querySelector('.anncom-container__clear');

const el = container.querySelector('.anncom-wrap');
let url = el.dataset.url;

let nameList = JSON.parse(localStorage.getItem('anncom_names'));
if (nameList === null) {
  nameList = [];
}

if( url.slice(-1) == '/' ) {
  url = url.substring(0, url.length - 1);
}

nameList.forEach((item) => {
  const listItem = document.createElement('li');
  const textItem = listItem.innerText = item.name;
  el.append(listItem);
});

const generateUrl = (url) => {
  const numberPeople = Math.floor(Math.random() * 20 + 1);
  return `${url}/people/${numberPeople}/`;
}

const getPeople = () => {
  fetch(generateUrl(url)).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject('Ooops');
  }).then(data => {
    const listItem = document.createElement('li');
    const textItem = listItem.innerText = data.name;
    el.append(listItem);
    nameList.push({'name': data.name});

    localStorage.setItem('anncom_names', JSON.stringify(nameList));
    btnAdd.textContent = 'Получить';
  }).catch(err => {
    console.log(err);
    btnAdd.textContent = 'Получить';
  })
}

const clearPeople = () => {
  el.innerHTML = '';
  localStorage.removeItem('anncom_names');
}

btnAdd.addEventListener('click', () => {
  getPeople();
  btnAdd.textContent = 'Подождите';
});

btnClear.addEventListener('click', () => {
  clearPeople();
})
