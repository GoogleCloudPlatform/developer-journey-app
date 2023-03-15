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

  
  async setUser({userId} :any): Promise<any> {
    const userDoc = this.db.collection('users').doc(userId);
    
    return userDoc.set({
      userId,
    }, {merge: true});
  }

  async getUser({userId}: any): Promise<User> {
    const userDoc = this.db.collection('users').doc(userId);
    const snapshot = await userDoc.get();
    const completedMissions = snapshot.data()?.completedMissions || [];
    
    return { userId, completedMissions }
  }

  async addCompletedMission({userId, missionId} :any): Promise<any> {
    const userDoc = this.db.collection('users').doc(userId);
    const { completedMissions } = await this.getUser({userId});
    const updatedMissions = [ ...completedMissions, missionId ]

    
    return userDoc.set({
      completedMissions: updatedMissions,
    }, {merge: true});
  }
}