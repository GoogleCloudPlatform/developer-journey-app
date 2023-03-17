import { LearningResource } from "./LearningResource";

export class Mission {
  id!: string;
  title!: string;
  technologies!: string[];
  learningResources!: LearningResource[];
}
