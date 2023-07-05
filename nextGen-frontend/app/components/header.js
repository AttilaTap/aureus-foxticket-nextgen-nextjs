import Image from "next/image";
import logo from "../../public/logo_2_bigger_transparent.svg";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex  h-48 bg-yellow-100 justify-between">
      <Image
        priority
        src={logo}
        height={120}
        alt="Nexticket logo"
        className="mt-6 h-16"
      />
      <div className="flex justify-center mr-6 mt-6">
        <button
          type="submit"
          className="bg-stone-600 w-20 h-8 p-1 rounded-full font-semibold text-stone-100 mr-5"
          onClick={""}
        >
          Login
        </button>
        <Link href="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 mt-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
