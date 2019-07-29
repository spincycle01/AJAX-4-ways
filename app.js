// ****************************************************
// XHR request
// ****************************************************
const url = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes';
const p = document.querySelector('#quote');
const xhrBtn = document.querySelector('#xhr');

const XHR = new XMLHttpRequest();

xhrBtn.addEventListener('click', () => {
  XHR.onreadystatechange = () => {
    if (XHR.readyState == 4 && XHR.status == 200) {
      const quote = JSON.parse(XHR.responseText);
      p.innerHTML = '"' + quote + '"';
    }
  };
  XHR.open('GET', url);
  XHR.send();
});
//
//
//
//
// ****************************************************
// Fetch request
// ****************************************************
const fetchBtn = document.querySelector('#fetch');
fetchBtn.addEventListener('click', () => {
  fetch('https://ron-swanson-quotes.herokuapp.com/v2/quotes')
    .then(handleErrorsFetch)
    .then(response => response.json())
    .then(data => {
      p.innerHTML = '"' + data + '"';
    })
    .catch(error => console.log('connection issue \n', error));
});

function handleErrorsFetch(response) {
  //if error,
  if (!response.ok) {
    throw Error('Problem with response', response.status);
  }
  return response;
}
//
//
//
//
// ****************************************************
// jQuery request
// ****************************************************
$('#jquery').on('click', function() {
  $.getJSON(url)
    .done(data => {
      $('#quote').text('"' + data + '"');
    })
    .fail(err => console.log('error:', err));
});
//
//
//
// ****************************************************
// Axios request
// ****************************************************
const axiosBtn = document.querySelector('#axios');
axiosBtn.addEventListener('click', () => {
  axios
    .get(url)
    .then(appendToPage)
    .catch(handleErrorsAxios);
});

function appendToPage(response) {
  p.innerHTML = '"' + response.data[0] + '"';
}

function handleErrorsAxios(err) {
  if (err.response) {
    console.log('Problem with Response:', err.response.status);
  } else if (err.request) {
    console.log('error with Request');
  } else {
    console.log('Error:', err.message);
  }
}
