import type Car from '../components/car/car';

export function getCar(): Promise<Car[]> {
  return fetch('http://127.0.0.1:3000/garage/')
    .then((response) => {
      if (!response.ok) {
        throw new Error('error');
      }

      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      return response.json() as Promise<Car[]>;
    })
    .catch((error) => {
      console.error(error);
      throw new Error('error');
    });
}

export function createCar(name: string, color: string): Promise<Response> {
  const url = 'http://127.0.0.1:3000/garage/';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, color }),
  };

  return fetch(url, options)
    .then((response: Response) => {
      if (!response.ok) {
        throw new Error('error');
      }

      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      return response.json() as Promise<Response>;
    })
    .catch((error) => {
      console.error(error);
      throw new Error('error');
    });
}
