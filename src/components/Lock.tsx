import React from "react";
import { LockState, PuzzleNode } from "../types";

interface Props {
  puzzleNode: PuzzleNode;
}

const numeralSVGLookup: Record<string, string> = {
  I: "M57.1875 108H53.8125V82.4062H57.1875V108Z",
  II: "M52.2832 108H48.9082V82.4062H52.2832V108ZM62.0918 108H58.7168V82.4062H62.0918V108Z",
  III: "M47.3789 108H44.0039V82.4062H47.3789V108ZM57.1875 108H53.8125V82.4062H57.1875V108ZM66.9961 108H63.6211V82.4062H66.9961V108Z",
  IV: "M45.7266 108H42.3516V82.4062H45.7266V108ZM60.3867 103.518L67.6992 82.4062H71.3906L61.8984 108H58.9102L49.4355 82.4062H53.1094L60.3867 103.518Z",
};

const stateColorLookup: Record<LockState, string> = {
  WAITING: "#828282",
  FAIL: "#EB5757",
  SUCCESS: "#219653",
};

const Lock: React.FC<Props> = ({ puzzleNode }) => {
  return (
    <svg
      width="111"
      height="144"
      viewBox="0 0 111 144"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M95.1429 48V40C95.1429 17.92 77.3829 0 55.5 0C33.6171 0 15.8571 17.92 15.8571 40V48C7.13571 48 0 55.2 0 64V128C0 136.8 7.13571 144 15.8571 144H95.1429C103.864 144 111 136.8 111 128V64C111 55.2 103.864 48 95.1429 48Z"
        fill={stateColorLookup[puzzleNode.state]}
      />
      <path
        d="M78 48H33V39.75C33 26.055 43.05 15 55.5 15C67.95 15 78 26.055 78 39.75V48Z"
        fill="white"
      />
      <path d={numeralSVGLookup[puzzleNode.key]} fill="#FFFF" />
    </svg>
  );
};

export default Lock;
