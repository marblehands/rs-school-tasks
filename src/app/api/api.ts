import type { CarOptions } from '../components/car/types';

export function getCar(): Promise<CarOptions[]> {
  return fetch('http://127.0.0.1:3000/garage/')
    .then((response) => {
      if (!response.ok) {
        throw new Error('error');
      }

      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      return response.json() as Promise<CarOptions[]>;
    })
    .catch((error) => {
      console.error(error);
      throw new Error('error');
    });
}

export function createCar(name: string, color: string): Promise<CarOptions> {
  const url = 'http://127.0.0.1:3000/garage/';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, color }),
  };

  return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error('error');
      }

      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      return response.json() as Promise<CarOptions>;
    })
    .catch((error) => {
      console.error(error);
      throw new Error('error');
    });
}
