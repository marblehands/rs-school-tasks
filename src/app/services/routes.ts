export enum Routes {
  AUTH = '/',
  ABOUT = '/about',
  CHAT = '/main',
}

export function isRoute(value: string): value is Routes {
  const routes: string[] = Object.values(Routes);

  return Object.values(routes).includes(value);
}
