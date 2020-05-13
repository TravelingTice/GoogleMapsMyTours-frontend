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

export const addApiKey = (key, token) => {
  return fetch(`${API}/api_keys`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ key })
  })
  .then(res => res.json())
  .catch(err => console.log(err))
}