enum Routes {
  LOGIN = '/login',
  START = '/start',
  GAME = '/game',
}

export function isRoute(value: string): value is Routes {
  const routes: string[] = Object.values(Routes);

  return Object.values(routes).includes(value);
}

export default Routes;
