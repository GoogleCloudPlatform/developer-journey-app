/**
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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

  /**
   * Returns true if able to connect to the Firestore instance.
   * The Firestore API times out a request after 60 seconds. This method
   * implements a configurable override that defaults to 5 seconds, but there's
   * no point in setting it higher than 60 seconds.
   * @param timeout seconds
   */
  async isConnected(timeout: number = 5): Promise<boolean> {
    try {
      timeout = Math.min(timeout, 60) * 1000;
      // eslint-disable-next-line no-undef
      let timerId: NodeJS.Timeout;

      const timer = new Promise<boolean>((resolve) => {
        timerId = setTimeout(() => resolve(false), timeout);
      });

      // TODO: research if there's a lighter weight way to status a connection.
      const connectionCheck = this.db.listCollections();

      return Promise.race([connectionCheck, timer]).then(result => {
        clearTimeout(timerId);
        return !!result;
      });

    } catch (err) {
      // GoogleError: Total timeout of API google.firestore.v1.Firestore
      // exceeded 60000 milliseconds before any response was received.
      return false;
    }
  }
}
