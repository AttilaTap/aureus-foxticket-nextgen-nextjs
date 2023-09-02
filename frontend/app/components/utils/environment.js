export default function getBackendUrl() {
  return process.env.NEXT_PUBLIC_BACKEND_URL ? process.env.NEXT_PUBLIC_BACKEND_URL : "http://localhost:9000/";
}
