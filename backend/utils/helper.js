import dotenv from "dotenv";

dotenv.config();

export default function getServerPort() {
  const defaultPort = 9000;
  const envPort = process.env.PORT;
  const portToUse = envPort === undefined ? defaultPort : envPort;
  return portToUse;
}
