import React from "react";

const NumberTextPair = ({ number, text }) => {
  return (
    <span className="text-base text-emerald-400 font-bold">
      {number} {text}
    </span>
  );
};

export default NumberTextPair;
