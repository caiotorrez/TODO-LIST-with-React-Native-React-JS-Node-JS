import constants from './constants';
import { AsyncStorage } from 'react-native';

const _token = async () => await AsyncStorage.getItem('@jwt');
let defaultHeaders = new Headers({'Accept': 'application/json', 'Content-Type': 'application/json'});

export default conection = {
    
    get: async (url, params = [], auth = true, headers = defaultHeaders) => {
        params = params.join('&');
        if (auth) headers.set('Authorization', await _token());

        return await fetch(`${constants.path.host}/${url}?${params}`, { headers: headers }).then((response) => {
            return response.json();
        });
    },

    post: async (url, form, auth = true, headers = defaultHeaders,) => {
        if (auth) headers.set('Authorization', await _token());

        return await fetch(`${constants.path.host}/${url}`, { method: "POST", headers: headers, body: JSON.stringify(form) }).then((response) => {
            return response.json();
        });
    },

    put: async (url, form, auth = true, headers = defaultHeaders,) => {
        if (auth) headers.set('Authorization', await _token());

        return await fetch(`${constants.path.host}/${url}`, { method: "PUT", headers: headers, body: JSON.stringify(form) }).then((response) => {
            return response.json();
        });
    },
    
}