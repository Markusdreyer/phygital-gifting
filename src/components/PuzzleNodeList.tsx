import { doc } from "firebase/firestore";
import React from "react";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { PuzzleNode } from "../types";
import LoadingSpinner from "./LoadingSpinner";

const PuzzleNodeList = () => {
  const firestore = useFirestore();
  const ref = doc(firestore, "phygital", "masterView");
  const data = useFirestoreDocData(ref).data;

  return (
    <div className="flex justify-center content-center">
      {console.log(data)}
      {data &&
        data.puzzleNodes.map((el: PuzzleNode) => (
          <div className="max-w-sm rounded overflow-hidden shadow-lg p-8">
            <h3 className="text-center">{el.key}</h3>
            <p>{el.state}</p>
          </div>
        ))}
    </div>
  );
};

export default PuzzleNodeList;
