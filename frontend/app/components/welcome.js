import useTicketStore from "@/store/store";
import { useEffect } from "react";
import { parseJwt } from "./utils/auth-token-handling";

export default function Welcome() {
  const [userEmailFromLocalStorage, setUserEmailFromLocalStorage] = useTicketStore((state) => [state.userEmailFromLocalStorage, state.setUserEmailFromLocalStorage]);

  useEffect(() => {
    let token = localStorage.getItem(process.env.NEXT_PUBLIC_COOKIE_NAME) || null;
    let parsedToken = parseJwt(token);
    setUserEmailFromLocalStorage(parsedToken ? parsedToken.email : null);
  }, []);

  if (typeof window === "undefined") {
    return null;
  } else {
    return (
      <>{userEmailFromLocalStorage && <h1 className="text-2xl font-semibold text-indigo-600 bg-white p-4 rounded-lg shadow-md mb-4">Hello, {userEmailFromLocalStorage}!👋</h1>}</>
    );
  }
}
