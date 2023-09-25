const { validatePassword } = require("../app/components/utils/validate-password");

test("Valid password should return an empty array for errors", () => {
  const password = "Abc123!@";
  const errors = validatePassword(password);
  expect(errors).toEqual([]);
});

test("Password length less than 8 characters should return an error", () => {
  const password = "Abc123";
  const errors = validatePassword(password);
  expect(errors).toContain("Password must be at least 8 characters long.");
});

test("Password without a number should return an error", () => {
  const password = "Abcdefg!";
  const errors = validatePassword(password);
  expect(errors).toContain("Password must contain at least one number.");
});

test("Password without an uppercase letter should return an error", () => {
  const password = "abcdefg1!";
  const errors = validatePassword(password);
  expect(errors).toContain("Password must contain at least one uppercase letter.");
});

test("Password without a lowercase letter should return an error", () => {
  const password = "ABCDEFG1!";
  const errors = validatePassword(password);
  expect(errors).toContain("Password must contain at least one lowercase letter.");
});

test("Password without a special character should return an error", () => {
  const password = "Abcdefg123";
  const errors = validatePassword(password);
  expect(errors).toContain('Password must contain at least one special character: ( ~ ` ! @ # $ % ^ & * ( ) - _ + = { } [ ] | \\ ; : " < > , . / ?)');
});

test("Valid password with extra spaces should return an empty array for errors", () => {
  const password = "  Abc123!@  ";
  const errors = validatePassword(password);
  expect(errors).toEqual([]);
});
