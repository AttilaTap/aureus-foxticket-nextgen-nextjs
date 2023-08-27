import bcrypt from "bcryptjs";

export function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  const hashed = bcrypt.hashSync(password, salt);

  if (bcrypt.compareSync(password, hashed)) {
    console.log("Client-side hashing done");
    return hashed;
  } else {
    throw new Error("Hashing failed");
  }
}
