import dotenv from "dotenv";

dotenv.config();

export function getSwaggerAddress() {
  const defaultAddress = `http://localhost:${getServerPort()}`;
  const envServerAddress = process.env.PUBLIC_SERVER_ADDRESS;
  const serverAddressToUse = envServerAddress === undefined ? defaultAddress : envServerAddress;
  return serverAddressToUse;
}

export function getServerPort() {
  const defaultPort = 9000;
  const envPort = process.env.PORT;
  const portToUse = envPort === undefined ? defaultPort : envPort;
  return portToUse;
}
