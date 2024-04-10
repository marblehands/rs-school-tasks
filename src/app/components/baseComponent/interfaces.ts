export default interface BaseComponentParams<T> {
  tag: T;
  classes?: string[];
  content?: string;
  attributes?: Record<string, string>;
  event?: string;
  callback?: (event: Event) => void;
}
