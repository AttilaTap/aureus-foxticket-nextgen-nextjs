import React from "react";

const IconTextPair = ({ icon: IconComponent, text }) => {
  return (
    <div className="flex items-center space-x-2">
      <IconComponent />
      <span className="text-xm text-emerald-400 font-bold">{text}</span>
    </div>
  );
};

export default IconTextPair;
