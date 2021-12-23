import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { PuzzleController, PuzzleState } from "../types";

const Progress = () => {
  const firestore = useFirestore();
  const ref = doc(firestore, "phygital", "masterView");
  const { data } = useFirestoreDocData(ref);

  const updatePuzzleState = async () => {
    await updateDoc(ref, {
      puzzleState: PuzzleState.FAILED,
    });
  };

  return (
    <>
      {data && data.puzzleState === PuzzleState.WAITING && (
        <div className="flex flex-col">
          <img src={require("../images/start.png")} alt="start"></img>
          <h2 className="font-sans text-xl font-bold">
            Finn og skann QR-koder for å finne løsningen!
          </h2>
        </div>
      )}
      {data && data.puzzleState === PuzzleState.ONGOING && (
        <CountdownCircleTimer
          isPlaying
          duration={20}
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
      {data && data.puzzleState === PuzzleState.FAILED && (
        <div className="flex flex-col">
          {(document.body.style.backgroundColor = "#EB5757")}

          <h2 className="font-sans text-xl font-bold">
            Oops, du gjorde noe feil! Skann første lappen for å starte på nytt.
          </h2>
        </div>
      )}
      {data && data.puzzleState === PuzzleState.SUCCESSFUL && (
        <div className="flex flex-col">
          {(document.body.style.backgroundColor = "#219653")}
          <h2 className="font-sans text-xl font-bold">Du løste første del!</h2>
          <nav className="flex-1 m-16 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <Link to="/solution">Se siste hint</Link>
          </nav>
        </div>
      )}
    </>
  );
};

export default Progress;
