import { CircularProgress } from "@mui/material";
import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { PuzzleController, PuzzleState } from "../types";

interface Props {
  puzzleController?: PuzzleController;
}

const colorStateLookup: Record<PuzzleState, string> = {
  WAITING: "#828282",
  ONGOING: "#F2C94C",
  FAILED: "#EB5757",
  SUCCESSFUL: "#219653",
};

const Progress: React.FC<Props> = ({ puzzleController }) => {
  if (puzzleController?.puzzleState === PuzzleState.WAITING) return null;

  return (
    <CountdownCircleTimer
      isPlaying
      duration={10}
      colors={[
        ["#219653", 0.33],
        ["#F2C94C", 0.33],
        ["#EB5757", 0.33],
      ]}
    >
      {({ remainingTime }: any) => remainingTime}
    </CountdownCircleTimer>
  );
};

export default Progress;
