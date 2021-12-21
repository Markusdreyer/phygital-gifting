enum PuzzleState {
  WAITING = "WAITING",
  ONGOING = "ONGOING",
  FAILED = "FAILED",
  SUCCESSFUL = "SUCCESSFUL",
}

enum LockState {
  WAITING = "WAITING",
  FAIL = "FAIL",
  SUCCESS = "SUCCESS",
}

export interface PuzzleController {
  puzzleStart: Date;
  puzzleState: PuzzleState;
  puzzleNodes: PuzzleNode[];
}

export interface PuzzleNode {
  state: LockState;
  key: string;
}
