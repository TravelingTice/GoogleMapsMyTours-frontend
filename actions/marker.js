import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const addMarkerInfoWindow = (data, token) => {
  return fetch(`${API}/markers`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .catch(err => console.log(err))
}

export const updateMarkerInfoWindow = (data, id, token) => {
  return fetch(`${API}/markers/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .catch(err => console.log(err))
}

export const removeMarker = (id, token) => {
  return fetch(`${API}/markers/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    }
  })
  .then(res => res.json())
  .catch(err => console.log(err))
}