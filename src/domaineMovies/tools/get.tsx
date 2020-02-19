import {BASE_URL, API_KEY, APPLICATION_ID} from './const';

export function get<T>(path: string, params: Record<string, any>) {
  return fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'X-Algolia-Application-Id': APPLICATION_ID,
      'X-Algolia-API-Key': API_KEY,
    },
    body: JSON.stringify(params),
  }).then<T>(res => res.json());
}
