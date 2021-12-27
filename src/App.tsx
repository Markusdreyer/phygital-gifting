import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useFirestore } from "reactfire";
import AdminPage from "./pages/AdminPage";
import MasterView from "./pages/MasterView";
import SolutionPage from "./pages/SolutionPage";
import { LockState, PuzzleController, PuzzleNode, PuzzleState } from "./types";
import { resetPuzzle } from "./utils";

const App = () => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const key = params.get("key");

  const firestore = useFirestore();
  const ref = doc(firestore, "phygital", "masterView");

  const updateLockState = async (key: string) => {
    let update = (await (await getDoc(ref)).data()) as PuzzleController;

    if (update.puzzleState === PuzzleState.FAILED) {
      return;
    }

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

  useEffect(() => {
    if (key) {
      console.log("KEY CHANGED");
      if (key === "start") {
        resetPuzzle(ref);
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
        {(document.body.style.backgroundColor = "#FFFF")}
        <Route path="/" element={<MasterView />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/solution" element={<SolutionPage />} />
        <Route
          path="/redirect"
          element={<Navigate replace to="/?key=start" />}
        />
      </Routes>
    </div>
  );
};

export default App;
