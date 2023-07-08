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
      className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-10"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="w-[1000px] h-[400px] relative flex justify-center items-center rounded-lg bg-slate-400">
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

        <div className="w-full h-auto">
          <div className="justify-center">
            <h2 className="px-8 text-2xl font-bold text-center">
              Log in and find your NEXTicket
            </h2>
          </div>
          <form className="bg-bone rounded px-8 pt-6 pb-8 mb-1">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                for="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4 leading-tight focus:outline-blue-500 focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                for="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-5 leading-tight focus:outline-blue-500 focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Sign In
              </button>
              <div className="flex-col items-end justify-end ">
                <a
                  className="block font-bold text-sm mb-2 text-blue-500 hover:text-blue-800 cursor-pointer"
                  onClick=""
                >
                  Forgot Password?
                </a>
                <a
                  className="block font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer"
                  onClick=""
                >
                  Not a member yet? Register Here!
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
