import useTicketStore from "@/store/store";

export default function Welcome() {
  const user = useTicketStore((state) => state.user);
  console.log(`User during home page: ${user}`);
  return <>{user && <h1 className="text-2xl font-semibold text-indigo-600 bg-white p-4 rounded-lg shadow-md mb-4">Hello, {user}!👋</h1>}</>;
}
