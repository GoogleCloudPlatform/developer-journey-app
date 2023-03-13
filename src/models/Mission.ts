export class LearningResource {
  title!: string;
  link!: string;
}

export class Mission {
  id!: string;
  title!: string;
  technologies!: Array<string>;
  learningResources!: Array<LearningResource>;
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETE" = "NOT_STARTED";
}

