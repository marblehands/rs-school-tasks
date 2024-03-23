export interface BaseComponentParams {
  tag: string;
  classes?: string[];
  content?: string;
  attributes?: Record<string, string>;
  event?: string;
  callback?: (event: Event) => void;
}
