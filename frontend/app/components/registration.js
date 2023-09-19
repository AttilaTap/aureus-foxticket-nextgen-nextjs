import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { hashPassword } from "./utils/hashing";
import { useState } from "react";
import getBackendUrl from "./utils/environment";
import { validatePassword } from "./utils/validate-password";

const Registration = ({ isVisible, onCloseReg, openLog }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  if (!isVisible) {
    return null;
  }

  function handleCloseReg(e) {
    if (e.target.id === "wrapper") {
      onCloseReg();
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setError("Passwords do not match.");
      return;
    }

    const passwordErrors = validatePassword(password);

    if (passwordErrors.length > 0) {
      setError(passwordErrors.join(" "));
      return;
    }

    try {
      const hashedPassword = hashPassword(password);

      const user = {
        email: email,
        password: hashedPassword,
      };

      const response = await fetch(`${getBackendUrl()}user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const responseData = await response.json();

      if (response.ok) {
        setError("");
        onCloseReg();
        openLog();
      } else {
        setError(responseData.error || "Registration failed");
      }
    } catch (error) {
      setError(error.message || "An unexpected error occurred.");
    }
  }

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-10" id="wrapper" onClick={handleCloseReg}>
      <div className="flex flex-col justify-center items-center w-1/3 min-w-min h-auto relative rounded-lg bg-modern-gray">
        <button className="absolute top-4 right-4 font-stone-100" onClick={onCloseReg}>
          <svg viewBox="0 0 800 1000" fill="currentColor" height="1em" width="1em">
            <path d="M700 100c28 0 51.667 9.667 71 29s29 43 29 71v600c0 26.667-9.667 50-29 70s-43 30-71 30H100c-26.667 0-50-10-70-30S0 826.667 0 800V200c0-28 10-51.667 30-71s43.333-29 70-29h600M554 738l86-86-154-152 154-154-86-86-154 152-152-152-88 86 154 154-154 152 88 86 152-152 154 152" />
          </svg>
        </button>

        <h2 className="px-2 text-2xl font-bold text-center mt-4 text-stone-950">Registration</h2>

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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className=" text-stone-700 text-m font-bold" htmlFor="password">
            Password
          </label>
          <input
            className={`rounded w-full p-2 mt-2 mb-4 text-stone-700 focus:outline-sky-600 focus:shadow-outline`}
            id="password"
            type="password"
            name="password"
            placeholder="******************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {validatePassword(password).map((error, index) => (
            <p key={index} className="text-red-500 text-xs mt-1">
              {error}
            </p>
          ))}

          <label className=" text-stone-700 text-m font-bold" htmlFor="password">
            Confirm password
          </label>
          <input
            className="rounded w-full p-2 mt-2 mb-4 text-stone-700 focus:outline-sky-600 focus:shadow-outline"
            id="password-confirm"
            type="password"
            name="password"
            placeholder="******************"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          {password !== passwordConfirm && <p className="text-red-500 text-xs mt-1">Passwords do not match.</p>}
          <div className="flex items-center justify-between gap-6 mt-7 mb-3">
            <button className="bg-sky-700 hover:bg-sky-800 text-stone-100 font-bold p-4 rounded-lg md:w-28 md:h-15 focus:outline-none focus:shadow-outline" type="submit">
              Register
            </button>
            <div>
              <button onClick={() => signIn("google")} className="flex items-center gap-2 bg-white shadow-xl rounded-lg pl-3">
                <Image src="/img/google-logo.png" height={20} width={20} alt="Google logo" />
                <span className="flex flex-row justify-center items-center bg-sky-700 text-stone-100 font-bold rounded-lg p-4 md:w-56 md:h-15">Register with Google</span>
              </button>
            </div>
            <div className="flex-wrap flex-col items-end mb-4">
              <p className="font-bold text-m text-stone-700 whitespace-nowrap">Have already registered?</p>
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
