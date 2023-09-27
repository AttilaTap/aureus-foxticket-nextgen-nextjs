export default function getBackendUrl() {
  return process.env.NODE_ENV === "test" && process.env.ENVIRONMENT !== "local"
    ? "nexticketserver.up.railway.app"
    : process.env.NEXT_PUBLIC_BACKEND_URL
    ? process.env.NEXT_PUBLIC_BACKEND_URL
    : "http://localhost:9000/";
}
