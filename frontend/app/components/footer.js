import Link from "next/link";

export default function Footer() {
  const userButton = document.getElementById("userButton");

  userButton.addEventListener("click", async () => {
    try {
      // Send a GET request to the /user endpoint
      const response = await fetch("/user");
      const data = await response.json();
      console.log(data); // Do something with the response data
    } catch (error) {
      console.error("Error:", error);
    }
  });
  return (
    <div className="flex flex-col h-20 bg-stone-100 border-t">
      <button id="userButton" className="bg-sky-700 hover:bg-sky-800 text-stone-100 font-bold p-4 rounded-lg md:w-24 md:h-15 focus:outline-none focus:shadow-outline" type="submit">
        ProtectedEndpoint
      </button>
      <Link href="" className="ml-3 mt-3 font-medium">
        About us
      </Link>
      <Link href="" className="ml-3 mt-1 mb-3 font-medium">
        How it works
      </Link>
    </div>
  );
}
