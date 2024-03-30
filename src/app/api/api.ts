// import eventEmitter from '../services/eventEmitter/eventEmitter';

import type { CarOptions } from '../components/car/types';
import type { WinnerOptions } from '../components/winners/types';
import type { DriveMode, EngineOptions, Status } from './types';

// Cars

export function getCars(): Promise<CarOptions[]> {
  return fetch('http://127.0.0.1:3000/garage/')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`getCars is not successful ${response.status}`);
      }

      return response.json() as Promise<CarOptions[]>;
    })
    .catch((error) => {
      console.log(error);
      throw new Error();
    });
}

export function getCarsWithLimit(limit: number, page: number): Promise<CarOptions[]> {
  return fetch(`http://127.0.0.1:3000/garage/?_page=${page}&_limit=${limit}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`getCarsWithLimit is not successful ${response.status}`);
      }

      return response.json() as Promise<CarOptions[]>;
    })
    .catch((error) => {
      console.log(error);
      throw new Error();
    });
}

export function getCarsNum(limit: number, page: number): Promise<number> {
  return fetch(`http://127.0.0.1:3000/garage/?_page=${page}&_limit=${limit}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`getCarsWithLimit is not successful ${response.status}`);
      }

      const headerTitle = 'X-Total-Count';
      const carsNum = Number(response.headers.get(headerTitle));

      return carsNum;
    })
    .catch((error) => {
      console.log(error);
      throw new Error();
    });
}

export function getCar(id: number): Promise<CarOptions> {
  return fetch(`http://127.0.0.1:3000/garage/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`getCar is not successful ${response.status}`);
      }

      return response.json() as Promise<CarOptions>;
    })
    .catch((error) => {
      console.log(error);
      throw new Error();
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
        throw new Error(`createCar is not successful ${response.status}`);
      }

      return response.json() as Promise<CarOptions>;
    })
    .catch((error) => {
      console.log(error);
      throw new Error();
    });
}

export function deleteCar(id: number): Promise<void> {
  const url = `http://127.0.0.1:3000/garage/${id}`;

  const options = {
    method: 'DELETE',
  };

  return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`deleteCar is not successful ${response.status}`);
      }
    })
    .catch((error) => {
      console.log(error);
      throw new Error();
    });
}

export function updateCar(id: number, name: string, color: string): Promise<CarOptions> {
  const url = `http://127.0.0.1:3000/garage/${id}`;
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, color }),
  };

  return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`updateCar is not successful ${response.status}, car id: ${id}`);
      }

      return response.json() as Promise<CarOptions>;
    })
    .catch((error) => {
      console.log(error);
      throw new Error();
    });
}

// Engine

export function startStopCar(id: number, status: Status): Promise<EngineOptions> {
  const url = `http://127.0.0.1:3000/engine/?id=${id}&status=${status}`;
  const options = {
    method: 'PATCH',
  };

  return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`startCar is not successful ${response.status}`);
      }

      return response.json() as Promise<EngineOptions>;
    })
    .catch((error) => {
      console.log(error);
      throw new Error();
    });
}

export function setDriveMode(id: number, status: Status): Promise<DriveMode> {
  const url = `http://127.0.0.1:3000/engine/?id=${id}&status=${status}`;
  const options = {
    method: 'PATCH',
  };

  return fetch(url, options)
    .then((response) => {
      if (response.status === 500) {
        throw new Error('500 INTERNAL SERVER ERROR. Car has been stopped suddenly. Its engine was broken down.');
      }

      if (response.status === 429) {
        throw new Error(
          '429 TOO MANY REQUESTS. Drive already in progress. You cannot run drive for the same car twice while it is not stopped.',
        );
      }

      if (response.status === 404) {
        throw new Error(
          '404 NOT FOUND. Engine parameters for car with such id was not found in the garage. Have you tried to set engine status to "started" before?',
        );
      }

      if (response.status === 400) {
        throw new Error(
          '400 BAD REQUEST. Wrong parameters: "id" should be any positive number, "status" should be "started", "stopped" or "drive"',
        );
      }

      return response.json() as Promise<DriveMode>;
    })
    .catch((error) => {
      console.log(error);
      throw new Error();
    });
}

// Winners

export function getWinners(): Promise<WinnerOptions[]> {
  return fetch('http://127.0.0.1:3000/winners/')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`getWinners is not successful ${response.status}`);
      }

      return response.json() as Promise<WinnerOptions[]>;
    })
    .catch((error) => {
      console.log(error);
      throw new Error();
    });
}

export function deleteWinner(id: number): Promise<void> {
  const url = `http://127.0.0.1:3000/winners/${id}`;

  const options = {
    method: 'DELETE',
  };

  return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`deleteWinner is not successful ${response.status}`);
      }
    })
    .catch((error) => {
      console.log(error);
      throw new Error();
    });
}

export function createWinner(id: number, wins: number, time: number): Promise<WinnerOptions> {
  const url = 'http://127.0.0.1:3000/winners/';
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, wins, time }),
  };

  return fetch(url, options).then((response) => {
    if (!response.ok) {
      throw new Error(`createWinner is not successful ${response.status}`);
    }

    return response.json() as Promise<WinnerOptions>;
  });
}

export function updateWinner(id: number, wins: number, time: number): Promise<WinnerOptions> {
  const url = `http://127.0.0.1:3000/winners/${id}`;
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ wins, time }),
  };

  return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`updateWinner is not successful ${response.status}, winner id: ${id}`);
      }

      return response.json() as Promise<WinnerOptions>;
    })
    .catch((error) => {
      console.log(error);
      throw new Error();
    });
}
