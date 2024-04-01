import { HttpStatus, ServerUrl } from './types';

import type { CarOptions } from '../components/car/types';
import type { WinnerOptions } from '../components/winners/types';
import type { DriveMode, EngineOptions, Status } from './types';

// Cars

export function getCars(): Promise<CarOptions[]> {
  return fetch(ServerUrl.GARAGE)
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
  return fetch(`${ServerUrl.GARAGE}?_page=${page}&_limit=${limit}`)
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
  return fetch(`${ServerUrl.GARAGE}?_page=${page}&_limit=${limit}`)
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
  return fetch(`${ServerUrl.GARAGE}${id}`)
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
  const url = `${ServerUrl.GARAGE}`;
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
  const url = `${ServerUrl.GARAGE}${id}`;

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
  const url = `${ServerUrl.GARAGE}${id}`;
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
  const url = `${ServerUrl.ENGINE}?id=${id}&status=${status}`;
  const options = {
    method: 'PATCH',
  };

  return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`startStopCar with ${status} status  is not successful ${response.status}`);
      }

      return response.json() as Promise<EngineOptions>;
    })
    .catch((error) => {
      console.log(error);
      throw new Error();
    });
}

export function setDriveMode(id: number, status: Status): Promise<DriveMode> {
  const url = `${ServerUrl.ENGINE}?id=${id}&status=${status}`;
  const options = {
    method: 'PATCH',
  };

  return fetch(url, options)
    .then((response) => {
      const httpStatus: HttpStatus = response.status;

      if (httpStatus === HttpStatus.INTERNAL_SERVER_ERROR) {
        throw new Error('500 INTERNAL SERVER ERROR. Car has been stopped suddenly. Its engine was broken down.');
      }

      if (httpStatus === HttpStatus.TOO_MANY_REQUESTS) {
        throw new Error(
          '429 TOO MANY REQUESTS. Drive already in progress. You cannot run drive for the same car twice while it is not stopped.',
        );
      }

      if (httpStatus === HttpStatus.NOT_FOUND) {
        throw new Error(
          '404 NOT FOUND. Engine parameters for car with such id was not found in the garage. Have you tried to set engine status to "started" before?',
        );
      }

      if (httpStatus === HttpStatus.BAD_REQUEST) {
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
  return fetch(ServerUrl.WINNERS)
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

export function getWinnersWithLimit(limit: number, page: number): Promise<WinnerOptions[]> {
  return fetch(`${ServerUrl.WINNERS}?_page=${page}&_limit=${limit}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`getWinnersWithLimit is not successful ${response.status}`);
      }

      return response.json() as Promise<WinnerOptions[]>;
    })
    .catch((error) => {
      console.log(error);
      throw new Error();
    });
}

export function getWinnersWithSort(limit: number, page: number, sort: string, order: string): Promise<WinnerOptions[]> {
  return fetch(`${ServerUrl.WINNERS}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`getWinnersWithSort is not successful ${response.status}`);
      }

      return response.json() as Promise<WinnerOptions[]>;
    })
    .catch((error) => {
      console.log(error);
      throw new Error();
    });
}

export function getWinnersNum(limit: number, page: number): Promise<number> {
  return fetch(`${ServerUrl.WINNERS}?_page=${page}&_limit=${limit}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`getWinnersNum is not successful ${response.status}`);
      }

      const headerTitle = 'X-Total-Count';
      const winnersNum = Number(response.headers.get(headerTitle));

      return winnersNum;
    })
    .catch((error) => {
      console.log(error);
      throw new Error();
    });
}

export function deleteWinner(id: number): Promise<void> {
  const url = `${ServerUrl.WINNERS}${id}`;

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
  const url = ServerUrl.WINNERS;
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
  const url = `${ServerUrl.WINNERS}${id}`;
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
