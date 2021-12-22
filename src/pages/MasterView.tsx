import { doc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useFirestore, useFirestoreDocData } from "reactfire";
import Lock from "../components/Lock";
import Progress from "../components/Progress";
import { LockState, PuzzleNode, PuzzleState } from "../types";

const mock = {
  puzzleStart: new Date(),
  puzzleState: PuzzleState.ONGOING,
  puzzleNodes: [],
};

const MasterView = () => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const foo = params.get("foo");

  const firestore = useFirestore();
  const ref = doc(firestore, "phygital", "masterView");
  const { data } = useFirestoreDocData(ref);

  return (
    <>
      <div className="flex justify-between m-8">
        {data &&
          data.puzzleNodes.map((el: PuzzleNode) => {
            <h2>{el.key}</h2>;
          })}
      </div>
      {console.log(data)}
      <div className="flex justify-center mt-16">
        <Progress puzzleController={mock} />
      </div>
    </>
  );
};
export default MasterView;
