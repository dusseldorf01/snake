interface ILeaderboardITableRow {
  id: number;
  login: string;
  level: number;
  score: number;
}

export interface ILeaderboardTable {
  data: ILeaderboardITableRow[];
}
