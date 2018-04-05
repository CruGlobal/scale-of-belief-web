import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const queryObject = parseQuery(window.location.hash);
if(queryObject && queryObject.access_token){
  sessionStorage.setItem('accessToken', queryObject.access_token);
  window.location.href = '/';
}else{
  ReactDOM.render(<App />, document.getElementById('root'));
  registerServiceWorker();
}


function parseQuery(queryString) {
  let query = {};
  const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split('=');
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
}