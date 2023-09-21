import React from "react";
import useTicketStore from "@/store/store";

const PasswordInput = ({ id, value, onChange }) => {
  const { showPassword, togglePasswordVisibility } = useTicketStore();

  return (
    <div className="relative">
      <input
        className={`rounded w-full p-2 mt-2 mb-4 text-stone-700 focus:outline-sky-600 focus:shadow-outline `}
        id={id}
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="******************"
        value={value}
        onChange={onChange}
      />
      <span className="absolute top-4 right-4 cursor-pointer" onClick={togglePasswordVisibility}>
        {showPassword ? "Hide" : "Show"} Password
      </span>
    </div>
  );
};

export default PasswordInput;
