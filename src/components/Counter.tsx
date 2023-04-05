import React, { useReducer } from "react";

type Props = {
  number: number;
};

const Counter = ({ number }: Props) => {
  return (
    <div className="counter">
      <span>{number}</span>
      <button>+1</button>
      <button>-1</button>
    </div>
  );
};

export default Counter;
