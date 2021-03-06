import fetch from 'isomorphic-fetch';
import { API } from '../config';
import lowerSnakalize from '../helpers/lowerSnakalize';

export const addLine = (line, mapId, token) => {
  return fetch(`${API}/lines`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    },
    body: JSON.stringify({line: lowerSnakalize(line), map_id: mapId })
  })
  .then(res => res.json())
  .catch(err => console.log(err))
}

export const updateLine = (line, id, token) => {
  return fetch(`${API}/lines/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    },
    body: JSON.stringify({ line: lowerSnakalize(line) })
  })
  .then(res => res.json())
  .catch(err => console.log(err))
}

export const removeLine = (id, token) => {
  return fetch(`${API}/lines/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    }
  })
  .then(res => res.json())
  .catch(err => console.log(err))
}