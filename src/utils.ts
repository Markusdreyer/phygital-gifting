import { getDoc, updateDoc } from "firebase/firestore";
import { LockState, PuzzleController, PuzzleNode, PuzzleState } from "./types";

export const resetPuzzle = async (ref: any) => {
  let update = (await (await getDoc(ref)).data()) as PuzzleController;
  document.body.style.backgroundColor = "#FFFF";
  update.puzzleNodes = update.puzzleNodes.map((el: PuzzleNode) => ({
    key: el.key,
    state: LockState.WAITING,
  }));
  update.puzzleState = PuzzleState.WAITING;
  console.log("RESET PAYLOAD:: ", update);
  await updateDoc(ref, {
    puzzleNodes: update.puzzleNodes,
    puzzleState: update.puzzleState,
  });
};
