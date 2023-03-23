import {Firestore} from "@google-cloud/firestore";
import { User } from "src/models/User";

export class Database {
  private db: Firestore;

  constructor() {
    this.db = new Firestore({
      projectId: "birds-of-paradise",
    });
  }

  async setUser({email, completedMissions}: {email: string, completedMissions?: string[] }): Promise<any> {
    const userDoc = this.db.collection('users').doc(email);

    return userDoc.set({
      email,
      completedMissions: completedMissions || [],
    }, {merge: true});
  }

  async getUser({email}: {email: string}): Promise<User> {
    const userDoc = this.db.collection('users').doc(email);
    const snapshot = await userDoc.get();
    const completedMissions = snapshot.data()?.completedMissions || [];

    return { email, completedMissions }
  }

  async addCompletedMission({email, missionId}: {email: string, missionId: string}): Promise<any> {
    const { completedMissions } = await this.getUser({email});
    const updatedMissions = [ ...completedMissions, missionId ]


    return this.setUser({
      email,
      completedMissions: updatedMissions,
    });
  }
}
