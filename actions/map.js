import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const getMap = (id, token) => {
  return fetch(`${API}/maps/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .catch(err => console.log(err))
}
