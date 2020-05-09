import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const getMarkerIcons = token => {
  return fetch(`${API}/marker_icons`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .catch(err => console.log(err))
}

export const createMarkerIcon = (markerIcon, token) => {
  return fetch(`${API}/marker_icons`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(markerIcon)
  })
  .then(res => res.json())
  .catch(err => console.log(err))
}

export const updateMarkerIcon = (markerIcon, id, token) => {
  return fetch(`${API}/marker_icons/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(markerIcon)
  })
  .then(res => res.json())
  .catch(err => console.log(err))
}
