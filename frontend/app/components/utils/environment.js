export default function getBackendUrl() {
  return process.env.BACKEND_URL ? process.env.BACKEND_URL : "http://localhost:9000/";
}
