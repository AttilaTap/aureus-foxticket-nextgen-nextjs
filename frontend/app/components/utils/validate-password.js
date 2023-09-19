export function validatePassword(password) {
  const errors = [];

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long.");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number.");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter.");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter.");
  }
  if (!/[~`!@#$%^&*()\-\_+={}[\]|\\;:"<>,./?]/.test(password)) {
    errors.push('Password must contain at least one special character: ( ~ ` ! @ # $ % ^ & * ( ) - _ + = { } [ ] | \\ ; : " < > , . / ?)');
  }

  return errors;
}
