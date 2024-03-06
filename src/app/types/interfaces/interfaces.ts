export interface BaseComponentParams {
  tag: string;
  classes?: string[];
  content?: string;
  event?: string;
  callback?: (event: Event) => void;
}
