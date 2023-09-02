import React, { useEffect, useState } from "react";
import useTicketStore from "@/store/store";

export default function Welcome() {
  const userFromTicketStore = useTicketStore((state) => state.user);
  const [userEmailFromLocalStorage, setUserEmailFromLocalStorage] = useState(null);

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    setUserEmailFromLocalStorage(userEmail);
  }, []);

  const user = userEmailFromLocalStorage || userFromTicketStore;

  if (typeof window === "undefined") {
    return null;
  } else {
    return <>{user && <h1 className="text-2xl font-semibold text-indigo-600 bg-white p-4 rounded-lg shadow-md mb-4">Hello, {user}!👋</h1>}</>;
  }
}
