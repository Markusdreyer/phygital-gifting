import React from "react";
import { doc } from "firebase/firestore";
import { useFirestore, useFirestoreDocData } from "reactfire";
import Lock from "../components/Lock";
import Progress from "../components/Progress";
import { PuzzleNode } from "../types";

const MasterView = () => {
  const firestore = useFirestore();
  const ref = doc(firestore, "phygital", "masterView");
  const data = useFirestoreDocData(ref).data;

  return (
    <>
      {console.log(data)}
      <div className="flex justify-between p-8 bg-white">
        {data &&
          data.puzzleNodes.map((el: PuzzleNode) => <Lock puzzleNode={el} />)}
      </div>
      <div className="flex justify-center mt-16">
        <Progress />
      </div>
    </>
  );
};
export default MasterView;
