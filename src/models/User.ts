// TODO
// export type Email = string;
// export type Timestamp = number;
// export type SessionId = string;
// export type SessionResult = object | SessionId;

export class User {
  userId!: string;
  completedMissions!: Set<string>;
}
