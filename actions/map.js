import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const getMapForEdit = (id, token) => {
  return fetch(`${API}/maps/${id}/edit`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .catch(err => console.log(err))
}
