import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const getApiKey = token => {
  return fetch(`${API}/api_keys`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .catch(err => console.log(err))
}
