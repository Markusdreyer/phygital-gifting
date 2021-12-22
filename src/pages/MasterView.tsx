import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useFirestore, useFirestoreDocData } from "reactfire";
import Lock from "../components/Lock";
import Progress from "../components/Progress";
import { LockState, PuzzleController, PuzzleNode, PuzzleState } from "../types";

const mock = {
  puzzleStart: new Date(),
  puzzleState: PuzzleState.ONGOING,
  puzzleNodes: [],
};

const MasterView = () => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const key = params.get("key");

  const firestore = useFirestore();
  const ref = doc(firestore, "phygital", "masterView");
  const { data } = useFirestoreDocData(ref);

  useEffect(() => {
    if (data && key) {
      updateLockState(key, data);
    }
  }, [data, key]);

  const updateLockState = async (key: string, data: any) => {
    const lockIndex = data.puzzleNodes.findIndex(
      (el: PuzzleNode) => el.key === key
    );
    const update = data.puzzleNodes;
    update[lockIndex] = { key: key, state: LockState.SUCCESS };

    await updateDoc(ref, {
      puzzleNodes: update,
    });
  };

  return (
    <>
      <div className="flex justify-between m-8">
        {data &&
          data.puzzleNodes.map((el: PuzzleNode) => <Lock puzzleNode={el} />)}
      </div>
      {console.log(data)}
      <div className="flex justify-center mt-16">
        <Progress puzzleController={mock} />
      </div>
    </>
  );
};
export default MasterView;
