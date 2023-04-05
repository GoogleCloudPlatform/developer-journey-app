import { Firestore } from "@google-cloud/firestore";
import { User } from "src/models/User";

export class Database {
  private db: Firestore;

  constructor() {
    if (process.env.NODE_ENV === 'development') {
      // use the firestore emulator
      this.db = new Firestore({
        host: "localhost:9999",
        projectId: "demo-test",
        ssl: false,
      });
    } else {
      // use the PROJECT_ID environment variable
      const projectId = process.env.PROJECT_ID;
      if (!projectId) {
        const errMessage = "PROJECT_ID environment variable must be defined.";
        console.error(errMessage);
        throw new Error(errMessage);
      }
      this.db = new Firestore({
        projectId: projectId,
      });
    }
  }

  async setUser({ username, completedMissions }: { username: string, completedMissions?: string[] }): Promise<any> {
    const userDoc = this.db.collection('users').doc(username);

    return userDoc.set({
      username,
      completedMissions: completedMissions || [],
    }, { merge: true });
  }

  async getUser({ username }: { username: string }): Promise<User> {
    const userDoc = this.db.collection('users').doc(username);
    const snapshot = await userDoc.get();
    const completedMissions = snapshot.data()?.completedMissions || [];

    return { username, completedMissions }
  }

  async addCompletedMission({ username, missionId }: { username: string, missionId: string }): Promise<any> {
    const { completedMissions } = await this.getUser({ username });
    const updatedMissions = [...completedMissions, missionId]


    return this.setUser({
      username,
      completedMissions: updatedMissions,
    });
  }
}
