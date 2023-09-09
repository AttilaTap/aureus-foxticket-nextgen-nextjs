import Link from "next/link";
import Image from "next/image";
import team1 from "@/public/team/Tomas.jpg";
export default function Team() {
  return (
    <div className="flex flex-col w-fit h-fit p-1 sm:p-4 mb-2 justify-center items-center grow bg-emerald-200 rounded-3xl border-2 border-solid border-slate-300">
      <h1 className="font-extrabold text-3xl m-2 text-slate-600">The NexTicket team</h1>
      <div className="flex flex-col md:flex-row justify-between items-center gap-1 sm:gap-3 sm:m-3 grow">
        <div className="aboutUsCard md:origin-top-right md:-rotate-12 relative">
          <p className="absolute top-1/3">Tomas</p>
          <Image src={team1} alt="photo of the team member" className="object-fit: contain hover:invisible z-10"></Image>
          <Link href="" className="absolute top-2/3 center">
            <p>LinkedIn</p>
          </Link>
        </div>
        <Link href="" className="aboutUsCard"></Link>
        <Link href="" className="aboutUsCard md:origin-top-left md:rotate-12"></Link>
      </div>
      <div className="flex flex-col justify-center items-center">
        <Link href="" className="aboutUsCard"></Link>
        <p className="font-bold text-xl text-slate-600">GreenFox mentor</p>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-1 sm:gap-3 sm:m-3 grow">
        <Link href="" className="aboutUsCard md:origin-bottom-right md:rotate-12"></Link>
        <Link href="" className="aboutUsCard"></Link>
        <Link href="" className="aboutUsCard md:origin-bottom-left md:-rotate-12"></Link>
      </div>
    </div>
  );
}
