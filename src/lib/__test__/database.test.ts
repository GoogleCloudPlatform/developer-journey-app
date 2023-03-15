import {Firestore} from "@google-cloud/firestore";
import {Database} from "../database";
import {User} from "../../models/User";

const directDatabaseConnectionForTestReset = new Firestore({
  projectId: "birds-of-paradise",
  // keyFilename: '/path/to/keyfile.json',
});

describe("database tests", () => {
  let fs: Database;

  beforeAll(async () => {
    await directDatabaseConnectionForTestReset.collection('users').doc('Bob').delete()
    fs = new Database();
  })

  it("should add and get a user", async () => {
    await fs.setUser({userId: 'Bob'});
    const user = await fs.getUser({userId: 'Bob'});

    expect(user).toEqual({ userId: "Bob", completedMissions: [] });
  });

  it("should add completed missions", async () => {
    await fs.setUser({userId: 'Bob'});
    await fs.addCompletedMission({userId: 'Bob', missionId: 'Mission0001aweifjwek'});
    const firstUserResponse = await fs.getUser({userId: 'Bob'});

    expect(firstUserResponse).toEqual({
      "userId": "Bob",
      completedMissions: ['Mission0001aweifjwek']
    });

    await fs.addCompletedMission({userId: 'Bob', missionId: 'Mission0002aweifjwek'});
    const secondUserResponse = await fs.getUser({userId: 'Bob'});

    expect(secondUserResponse).toEqual({
      "userId": "Bob",
      completedMissions: ['Mission0001aweifjwek', 'Mission0002aweifjwek']
    });
  });
});