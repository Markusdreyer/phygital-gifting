import { collection, doc, setDoc } from "firebase/firestore";
import React from "react";
import { Link } from "react-router-dom";
import {
  useFirestore,
  useFirestoreCollection,
  useFirestoreCollectionData,
  useFirestoreDocData,
} from "reactfire";
import { PuzzleController } from "../types";

const AdminPage = () => {
  const firestore = useFirestore();
  const ref = doc(firestore, "phygital", "masterView");
  const { data } = useFirestoreDocData(ref);
  const puzzleController = data.puzzleController as unknown as PuzzleController;

  const addPuzzleNode = async () => {
    //await setDoc(doc(firestore, "phygital"));
  };
  const removePuzzleNode = () => {};

  return (
    <div className="flex">
      <nav className="flex-1 m-16 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        <Link to="/">Master view</Link>
      </nav>
      <button
        className="flex-1 m-16 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={addPuzzleNode}
      >
        Add node
      </button>
      <h2>Nodes</h2>
      {console.log(puzzleController)}
      {puzzleController &&
        puzzleController.puzzleNodes.map((el) => (
          <div>
            <h3>{el.key}</h3>
            <p>{el.state}</p>
          </div>
        ))}
    </div>
  );
};

export default AdminPage;
