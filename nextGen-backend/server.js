import express from "express";
import cors from "cors";
import { readFileSync } from "fs";
import https from "https";
import { checkEmailExists, hashPassword, registerUser, sendSuccessEmail } from "./services/user-service.js";
import { createToken } from "./services/jwt-service.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/user/reg", async (req, res) => {
  const { email, password } = req.body;
  const token = createToken({ email });

  try {
    if (await checkEmailExists(email)) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await hashPassword(password);
    await registerUser(email, hashedPassword);

    await sendSuccessEmail(email);

    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/user/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (await !checkEmailExists(email)) {
      return res.status(200).json({ email: "The email is correct." });
    } else {
      return res.status(400).json({ error: "Email not exists." });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//  INACTIVATED HTTPS option for the backend server
// const httpsOptions = {
//   key: readFileSync('./certs/key.pem'),
//   cert: readFileSync('./certs/cert.pem'),
//   passphrase: 'nextgen',
// };

// const server = https.createServer(httpsOptions, app).listen(9000, () => {
//   console.log("I'm running on HTTPS");
// });

const server = app.listen(9000, () => {
  console.log("I'm running");
});

export { app, server };
