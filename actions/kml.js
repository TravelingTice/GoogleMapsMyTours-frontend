import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const addKml = (kml, map_id, token) => {
  return fetch(`${API}/kmls`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ kml, map_id })
  })
  .then(res => res.json())
  .catch(err => console.log(err))
}

export const removeKML = (id, token) => {
  return fetch(`${API}/kmls/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .catch(err => console.log(err))
}