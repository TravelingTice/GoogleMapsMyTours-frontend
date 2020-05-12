import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const addLine = (line, token) => {
  return fetch(`${API}/lines`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    },
    body: JSON.stringify(line)
  })
  .then(res => res.json())
  .catch(err => console.log(err))
}