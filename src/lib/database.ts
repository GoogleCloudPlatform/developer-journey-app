import {Firestore} from "@google-cloud/firestore";
import { User } from "src/models/User";

export class Database {
  private db: Firestore;

  constructor() {
    this.db = new Firestore({
      projectId: "birds-of-paradise",
      // keyFilename: '/path/to/keyfile.json',
    });
  }

  async setUser({username, completedMissions}: {username: string, completedMissions?: string[] }): Promise<any> {
    const userDoc = this.db.collection('users').doc(username);
    
    return userDoc.set({
      username,
      completedMissions: completedMissions || [],
    }, {merge: true});
  }

  async getUser({username}: {username: string}): Promise<User> {
    const userDoc = this.db.collection('users').doc(username);
    const snapshot = await userDoc.get();
    const completedMissions = snapshot.data()?.completedMissions || [];

    return { username, completedMissions }
  }

  async addCompletedMission({username, missionId}: {username: string, missionId: string}): Promise<any> {
    const { completedMissions } = await this.getUser({username});
    const updatedMissions = [ ...completedMissions, missionId ]

    
    return this.setUser({
      username,
      completedMissions: updatedMissions,
    });
  }
}
