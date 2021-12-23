import { CircularProgress } from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { PuzzleController, PuzzleState } from "../types";

const colorStateLookup: Record<PuzzleState, string> = {
  WAITING: "#828282",
  ONGOING: "#F2C94C",
  FAILED: "#EB5757",
  SUCCESSFUL: "#219653",
};

const Progress = () => {
  const firestore = useFirestore();
  const ref = doc(firestore, "phygital", "masterView");
  const { data } = useFirestoreDocData(ref);

  if (data && data.puzzleState === PuzzleState.WAITING) return null;

  const updatePuzzleState = async () => {
    await updateDoc(ref, {
      puzzleState: PuzzleState.FAILED,
    });
  };

  return (
    <>
      {data && data.puzzleState === PuzzleState.ONGOING && (
        <CountdownCircleTimer
          isPlaying
          duration={10}
          colors={[
            ["#219653", 0.33],
            ["#F2C94C", 0.33],
            ["#EB5757", 0.33],
          ]}
          onComplete={() => {
            updatePuzzleState();
            return [false, 0];
          }}
        >
          {({ remainingTime }: any) => remainingTime}
        </CountdownCircleTimer>
      )}
    </>
  );
};

export default Progress;
