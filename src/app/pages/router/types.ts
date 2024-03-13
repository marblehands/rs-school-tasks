enum Routes {
  LOGIN = '/login',
  START = '/start',
  GAME = '/game',
}

export function isRoute(value: string): value is Routes {
  return value in Routes;
}

export default Routes;
