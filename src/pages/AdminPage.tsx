import React from "react";
import { Link } from "react-router-dom";
import PuzzleNodeList from "../components/PuzzleNodeList";

const AdminPage = () => {
  const addPuzzleNode = async () => {};

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
