export interface User {
  name: string;
  surname: string;
}

export default function isUser<T extends User>(object: T): object is T {
  return 'name' in object && 'description' in object;
}
