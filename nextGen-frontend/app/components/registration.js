import Link from "next/link";

const Registration = ({ isVisible, onCloseReg, openLog }) => {
  if (!isVisible) {
    return null;
  }
  function handleCloseReg(e) {
    if (e.target.id === "wrapper") {
      onCloseReg();
    }
  }
  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-10" id="wrapper" onClick={handleCloseReg}>
      <div className="flex flex-col justify-center items-center w-1/3 min-w-min  h-auto relative  rounded-lg bg-stone-400">
        <button className="absolute top-4 right-4 font-stone-100" onClick={onCloseReg}>
          <svg viewBox="0 0 800 1000" fill="currentColor" height="1em" width="1em">
            <path d="M700 100c28 0 51.667 9.667 71 29s29 43 29 71v600c0 26.667-9.667 50-29 70s-43 30-71 30H100c-26.667 0-50-10-70-30S0 826.667 0 800V200c0-28 10-51.667 30-71s43.333-29 70-29h600M554 738l86-86-154-152 154-154-86-86-154 152-152-152-88 86 154 154-154 152 88 86 152-152 154 152" />
          </svg>
        </button>

        <h2 className="px-2 text-2xl font-bold text-center mt-2 text-stone-950">Registration</h2>

        <form className="px-8 pt-6">
          <label className="text-stone-700 text-m font-bold" htmlFor="username">
            E-mail
          </label>
          <input
            className="rounded w-full p-2 mt-2 mb-4 text-stone-700  focus:outline-sky-600 focus:shadow-outline"
            id="username"
            type="email"
            name="email"
            placeholder="example@gmail.com"
          />
          <label className=" text-stone-700 text-m font-bold" htmlFor="password">
            Password
          </label>
          <input
            className="rounded w-full p-2 mt-2 mb-4 text-stone-700  focus:outline-sky-600 focus:shadow-outline"
            id="password"
            type="password"
            name="password"
            placeholder="******************"
          />
          <label className=" text-stone-700 text-m font-bold" htmlFor="password">
            Confirm password
          </label>
          <input
            className="rounded w-full p-2 mt-2 mb-4 text-stone-700 focus:outline-sky-600 focus:shadow-outline"
            id="password-confirm"
            type="password"
            name="password"
            placeholder="******************"
          />
          <div className="flex items-center justify-between gap-2 mt-8">
            <button
              className="bg-sky-700 hover:bg-sky-800 text-stone-100 font-bold p-1 mb-3 rounded-lg md:w-24 md:h-12 focus:outline-none focus:shadow-outline"
              type="button"
            >
              Register
            </button>
            <div className="flex-wrap flex-col mb-3 items-end">
              <p className="font-bold text-m text-stone-700">Have already registered?</p>
              <Link
                className="font-bold text-m text-sky-700 hover:text-sky-800 cursor-pointer"
                href=""
                onClick={() => {
                  openLog();
                  onCloseReg();
                }}
              >
                Please login here.
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Registration;