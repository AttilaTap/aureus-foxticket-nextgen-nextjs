import React from 'react';

const Page = ({ onSwitchToLogin }) => {
  return (
    <div className="h-screen m-0  items-center bg-stone-100">
      <h2 className="mb-4 text-3xl font-bold">Registration</h2>
      <form className="flex flex-col gap-4 text-xl">
        <label htmlFor="email">
          E-mail:
          <input id="email" type="email" name="email" required />
        </label>
        <label htmlFor="password">
          Password:
          <input id="password " type="password" name="password" required />
        </label>
        <label htmlFor="confirm-password">
          Confirm Password:
          <input
            id="confirm-password "
            type="password"
            name="confirm-password"
            required
          />
        </label>
      </form>
      <button
        className="bg-stone-600 w-20 h-8 p-1 rounded-full font-semibold text-stone-100  mt-4"
        onClick={onSwitchToLogin}
      >
        Submit
      </button>
      <h3 className="mt-4" href="">
        Already registered? Log in here!
      </h3>
    </div>
    // </div>
  );
};

export default Page;
