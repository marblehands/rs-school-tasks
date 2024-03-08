import LocalStorageService from './localStorage';
import isUser from './types';

import type { User } from './types';

export default function getItemFromLs(key: string): User | null {
  const ls = new LocalStorageService(key);

  const user = ls.getUser();

  if (!user || !isUser(user)) {
    return null;
  }

  // eslint-disable-next-line no-console
  console.log('User exist: ', user);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return user;
}
