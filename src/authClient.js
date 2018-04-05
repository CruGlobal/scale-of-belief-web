import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'admin-on-rest'

export default (type, params) => {
    switch (type) {
      case AUTH_LOGIN: {
        return Promise.resolve();
      }
      case AUTH_LOGOUT: {
        sessionStorage.removeItem('accessToken');

        if(sessionStorage.getItem('sessionToken')){
          sessionStorage.removeItem('sessionToken');
          window.location.href = process.env.REACT_APP_KEY_URL + '/logout';
        }

        return Promise.resolve();
      }
      case AUTH_ERROR: {
        const status  = params.message.status;
        if (status === 401 || status === 403) {
            return Promise.reject({})
        }
        return Promise.resolve();
      }
      case AUTH_CHECK: {
        const sessionToken = sessionStorage.getItem('sessionToken');
        if(sessionToken){
          return Promise.resolve();
        }

        const serviceUrl = process.env.REACT_APP_SERVICE_URL;
        const authenticationUrl = process.env.REACT_APP_KEY_URL;
        const keyClientId = process.env.REACT_APP_KEY_CLIENT_ID;
        const accessToken = sessionStorage.getItem('accessToken');
        if(!accessToken){
          window.location.href = authenticationUrl + '/login' +
              '?response_type=token' +
              '&client_id=' + keyClientId +
              '&redirect_uri=' + encodeURIComponent(window.location.origin) +
              '&scope=fullticket';

          return Promise.reject({});
        }

        sessionStorage.removeItem('accessToken');
        const oauthPath = '/api/oauth/ticket';
        const serviceParameter = '?service=' + encodeURIComponent(serviceUrl);

        return fetch(new Request(authenticationUrl + oauthPath + serviceParameter, {
          method: 'GET',
          headers: new Headers({
            Authorization: 'Bearer ' + accessToken,
            Accept: 'application/json'
          })
        })).then(response => {
          if (response.status !== 200) {
            throw new Error(response.statusText)
          }
          return response.json()
        }).then((ticketObj) => {

          //get JWT from API
          return fetch(new Request(serviceUrl, {
            method: 'POST',
            headers: new Headers({
              'Content-Type': 'application/json'
            }),
            body: JSON.stringify(ticketObj)
          })).then(response => {
            if (response.status !== 200) {
              throw new Error(response.statusText)
            }
            return response.json()
          }).then((response) => {

            //save session JWT to sessionStorage
            sessionStorage.setItem('sessionToken', response);
            return Promise.resolve();
          });
        })
      }
      default: {
        return Promise.reject('Unknown method')
      }
    }
}