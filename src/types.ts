export enum PuzzleState {
  WAITING = "WAITING",
  ONGOING = "ONGOING",
  FAILED = "FAILED",
  SUCCESSFUL = "SUCCESSFUL",
}

export enum LockState {
  WAITING = "WAITING",
  FAIL = "FAIL",
  SUCCESS = "SUCCESS",
}

export interface PuzzleController {
  puzzleState: PuzzleState;
  puzzleNodes: PuzzleNode[];
}

export interface PuzzleNode {
  state: LockState;
  key: string;
}
