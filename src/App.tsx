import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useFirestore, useFirestoreDocData } from "reactfire";
import AdminPage from "./pages/AdminPage";
import MasterView from "./pages/MasterView";
import { LockState, PuzzleController, PuzzleNode, PuzzleState } from "./types";

const App = () => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const key = params.get("key");

  const firestore = useFirestore();
  const ref = doc(firestore, "phygital", "masterView");

  const updateLockState = async (key: string) => {
    let update = (await (await getDoc(ref)).data()) as PuzzleController;
    const lockIndex = update.puzzleNodes.findIndex(
      (el: PuzzleNode) => el.key === key
    );

    const puzzleState = determinePuzzleStates(lockIndex, update);
    update.puzzleNodes[lockIndex] = { key: key, state: puzzleState.lockState };

    await updateDoc(ref, {
      puzzleNodes: update.puzzleNodes,
      puzzleState: puzzleState.state,
    });
  };

  const resetPuzzle = async () => {
    let update = (await (await getDoc(ref)).data()) as PuzzleController;

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

  useEffect(() => {
    if (key) {
      console.log("KEY CHANGED");

      if (key === "start") {
        resetPuzzle();
        return;
      }

      updateLockState(key);
    }
  }, [key]);

  const determinePuzzleStates = (
    lockIndex: number,
    data: PuzzleController
  ): { state: PuzzleState; lockState: LockState } => {
    if (lockIndex === 0) {
      return { state: PuzzleState.ONGOING, lockState: LockState.SUCCESS };
    }

    if (data.puzzleNodes[lockIndex - 1].state !== LockState.SUCCESS) {
      return { state: PuzzleState.FAILED, lockState: LockState.FAIL };
    }

    if (data.puzzleNodes.length === lockIndex + 1) {
      return { state: PuzzleState.SUCCESSFUL, lockState: LockState.SUCCESS };
    }

    return { state: PuzzleState.ONGOING, lockState: LockState.SUCCESS };
  };
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MasterView />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </div>
  );
};

export default App;
