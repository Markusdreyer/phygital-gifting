import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFirestore, useFirestoreDocData } from "reactfire";
import PuzzleNodeList from "../components/PuzzleNodeList";
import { PuzzleController, PuzzleNode } from "../types";

const AdminPage = () => {
  const addPuzzleNode = async () => {};
  const removePuzzleNode = () => {};

  return (
    <>
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
      </div>
      <PuzzleNodeList />
    </>
  );
};

export default AdminPage;
