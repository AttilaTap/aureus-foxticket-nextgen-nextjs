import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo_black_transp.svg";

export default function BasketNavbar() {
  return (
    <>
      <div className="flex justify-between">
        <Image priority src={logo} height={120} width={300} alt="Nexticket logo" className="mt-6 mb-6 ml-6  h-16" />
        <div className="flex justify-center items-center mr-10">
          <Link href="/">
            <p className="font-bold text-2xl text-stone-600">Exit</p>
          </Link>
        </div>
      </div>
    </>
  );
}
