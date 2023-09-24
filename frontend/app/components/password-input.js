import React, { useState } from "react";
import useTicketStore from "@/store/store";

const PasswordInput = ({ id, value, onChange, showValidation }) => {
  const { showPassword, togglePasswordVisibility } = useTicketStore();

  // State to track validation status
  const [validationStatus, setValidationStatus] = useState({
    minLength: false,
    containsNumber: false,
    containsUppercase: false,
    containsLowercase: false,
    containsSpecialChar: false,
  });

  // Validate the password and update the state
  const validatePassword = (inputValue) => {
    setValidationStatus({
      minLength: inputValue.length >= 8,
      containsNumber: /[0-9]/.test(inputValue),
      containsUppercase: /[A-Z]/.test(inputValue),
      containsLowercase: /[a-z]/.test(inputValue),
      containsSpecialChar: /[^A-Za-z0-9]/.test(inputValue),
    });
  };

  // Validate the password when input value changes
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    onChange(e); // Send the change to the parent component
    validatePassword(newValue);
  };

  // Validation messages with corresponding classes
  const validationMessages = {
    minLength: "Password must be at least 8 characters long.",
    containsNumber: "Password must contain at least one number.",
    containsUppercase: "Password must contain at least one uppercase letter.",
    containsLowercase: "Password must contain at least one lowercase letter.",
    containsSpecialChar: 'Password must contain at least one special character: ( ~ ` ! @ # $ % ^ & * ( ) - _ + = { } [ ] | \\ ; : " < > , . / ?)',
  };

  return (
    <div className="relative">
      <input
        className={`rounded w-full p-2 mt-2 mb-4 text-stone-700 focus:outline-sky-600 focus:shadow-outline `}
        id={id}
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="******************"
        value={value}
        onChange={handleInputChange}
      />
      <span className="absolute top-4 right-4 cursor-pointer" onClick={togglePasswordVisibility}>
        {showPassword ? "Hide" : "Show"} Password
      </span>
      {showValidation &&
        Object.keys(validationMessages).map((key) => (
          <p key={key} className={`text-${validationStatus[key] ? "green" : "red"}-500 text-xs mt-1`}>
            {validationMessages[key]}
          </p>
        ))}
    </div>
  );
};

export default PasswordInput;
