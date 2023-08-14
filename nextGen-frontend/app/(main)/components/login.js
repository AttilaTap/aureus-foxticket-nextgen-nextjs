import Link from 'next/link';
import useTicketStore from '@/store/store';

const Login = ({ isVisible, onCloseLog, openReg }) => {
  const setUser = useTicketStore((state) => state.setUser);

  if (!isVisible) return null;
  function handleClose(e) {
    if (e.target.id === 'wrapper') {
      onCloseLog();
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const emailInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    try {
      // const hashedPassword = hashPassword(passwordInput.value);

      const user = {
        email: emailInput.value,
        password: passwordInput.value, //???? hashing
      };

      const response = await fetch('http://localhost:9000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const responseData = await response.json();

      if (response.ok) {
        alert('Login is successful!');
        setUser(responseData.login);
        onCloseLog();
      } else {
        alert(responseData.error || 'Login failed');
      }
    } catch (error) {
      alert(error.message || 'An unexpected error occurred.');
    }
  }

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-10"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="flex flex-col justify-center items-center w-1/2 lg:w-1/3 sm:min-w-fit h-auto relative  rounded-lg bg-stone-400">
        <button
          className="absolute top-4 right-4 font-stone-100"
          onClick={onCloseLog}
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

        <h2 className="px-2 text-2xl font-bold text-center mt-5 xl:mt-2 mb-3 text-stone-950">
          Log in and find your NEXTicket
        </h2>

        <form className="px-8 pt-6" onSubmit={handleSubmit}>
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
          <label
            className=" text-stone-700 text-m font-bold"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="rounded w-full p-2 mt-2 mb-4 text-stone-700  focus:outline-sky-600 focus:shadow-outline"
            id="password"
            type="password"
            name="password"
            placeholder="******************"
          />

          <div className="flex items-center justify-between gap-2 mt-8">
            <button
              className="bg-sky-700 hover:bg-sky-800 text-stone-100 font-bold p-1 rounded-lg md:w-24 md:h-12 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
            <div className="flex-wrap flex-col mb-3 items-end">
              <Link
                className="font-bold text-m text-sky-700 hover:text-sky-800 cursor-pointer"
                href=""
              >
                Forgot Password?
              </Link>
              <p className="mt-2 font-bold text-m text-stone-700">
                Not a member yet?
              </p>
              <Link
                className="font-bold text-m text-sky-700 hover:text-sky-800 cursor-pointer"
                href=""
                onClick={() => {
                  openReg();
                  onCloseLog();
                }}
              >
                Register Here!
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
