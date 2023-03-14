import { LearningResource } from "./LearningResource";

export class Mission {
  id!: string;
  title!: string;
  technologies!: string[];
  learningResources!: LearningResource[];

  // status is not stored in the database, it is calculated from the user object
  status!: string;
}

