import {Firestore} from "@google-cloud/firestore";
import {Database} from "../database";
import {User} from "../../models/User";

describe("database tests", () => {
  let fs: Database;

  beforeAll(async () => {
    fs = new Database();
  })

  it.skip("should pass (just a placeholder)", () => {
    expect(true).toBeTruthy();
  });

  it("should add a doc", async () => {

    const docRef = fs.db.collection('users').doc("bob");

    await docRef.set({
      userId: "1",
      email: "bob@example.com",
    });

    const snapshot = await fs.db.collection('users').get();
    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });

    expect(snapshot.size).toEqual(1);
    await fs.db.collection("users").doc("bob").delete()
  });
});
