import {Firestore} from "@google-cloud/firestore";
import {Database} from "../database";

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
    await fs.setUser({email: 'Bob'});
    const user = await fs.getUser({email: 'Bob'});

    expect(user).toEqual({ email: "Bob", completedMissions: [] });
  });

  it("should add completed missions", async () => {
    await fs.setUser({email: 'Bob'});
    await fs.addCompletedMission({email: 'Bob', missionId: 'Mission0001aweifjwek'});
    const firstUserResponse = await fs.getUser({email: 'Bob'});

    expect(firstUserResponse).toEqual({
      "email": "Bob",
      completedMissions: ['Mission0001aweifjwek']
    });

    await fs.addCompletedMission({email: 'Bob', missionId: 'Mission0002aweifjwek'});
    const secondUserResponse = await fs.getUser({email: 'Bob'});

    expect(secondUserResponse).toEqual({
      "email": "Bob",
      completedMissions: ['Mission0001aweifjwek', 'Mission0002aweifjwek']
    });
  });
});