import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const getMaps = token => {
  return fetch(`${API}/maps`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .catch(err => console.log(err))
}

export const getMapForEdit = (id, token) => {
  return fetch(`${API}/maps/${id}/edit`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .catch(err => console.log(err))
}

export const getMap = id => {
  return fetch(`${API}/maps/${id}`)
  .then(res => res.json())
  .catch(err => console.log(err))
}

export const getMapName = id => {
  return fetch(`${API}/maps/${id}/map-name`)
  .then(res => res.json())
  .catch(err => console.log(err))
}

export const removeMap = (id, token) => {
  return fetch(`${API}/maps/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .catch(err => console.log(err))
}