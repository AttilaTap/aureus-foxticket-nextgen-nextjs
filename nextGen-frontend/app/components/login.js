import React from "react";

const Login = ({ isVisible, onClose }) => {
  if (!isVisible) return null;
  function handleClose(e) {
    if (e.target.id === "wrapper") {
      onClose();
    }
  }
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-0 backdrop-blur-sm flex justify-center items-center "
      id="wrapper"
      onClick={handleClose}
    >
      <div className="w-[600px] h-[400px] relative flex justify-center items-center rounded-lg bg-slate-400">
        <button
          className="absolute top-4 right-4 font-stone-100"
          onClick={onClose}
        >
          <svg
            viewBox="0 0 800 1000"
            fill="currentColor"
            height="1em"
            width="1em"
          >
            <path d="M700 100c28 0 51.667 9.667 71 29s29 43 29 71v600c0 26.667-9.667 50-29 70s-43 30-71 30H100c-26.667 0-50-10-70-30S0 826.667 0 800V200c0-28 10-51.667 30-71s43.333-29 70-29h600M554 738l86-86-154-152 154-154-86-86-154 152-152-152-88 86 154 154-154 152 88 86 152-152 154 152" />
          </svg>
        </button>
        <div className=" bg-grey border-2 p-2">Center</div>
      </div>
    </div>
  );
};
export default Login;
