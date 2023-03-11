import {Firestore} from "@google-cloud/firestore";

export class Database {
  db: Firestore;

  constructor() {
    this.db = new Firestore({
      projectId: "birds-of-paradise",
      // keyFilename: '/path/to/keyfile.json',
    });
  }
}
