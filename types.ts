export enum GameStage {
  SPLASH,
  SELECT_MODE,
  PLAYING,
  REWARDS,
  PARENTS_CORNER,
  END,
}

export enum ProblemType {
  ADDITION,
  MULTIPLICATION,
  DIVISION,
}

export interface Problem {
  key: string; // e.g., "mult_2x3"
  type: ProblemType;
  question: string;
  visual: {
    groups: number;
    itemsPerGroup: number;
  };
  options: number[];
  answer: number;
}

export interface Reward {
  id: string;
  name: string;
  cost: number;
  icon: string;
}

export interface RedeemedReward {
    id: string;
    date: string;
    fulfilled: boolean;
}

export interface Proficiency {
  [key: string]: {
    attempts: number;
    correct: number;
  };
}