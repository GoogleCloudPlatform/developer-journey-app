export class LearningResource {
  title!: string;
  link!: string;
}

export class Mission {
  id!: string;
  title!: string;
  technologies!: string[];
  learningResources!: LearningResource[];

  // status is not stored in the database, it is calculated from the user object
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETE" = "NOT_STARTED";
}

