export type ResultType = "Tutorial" | "Sample" | "Video";
export type UrlString = string;
export class ProjectResult {
  resultItemString?: string;

  resultType?: ResultType;

  timestamp?: number;

  link?: UrlString;
}
