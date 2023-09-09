"use client";
import Link from "next/link";
import Image from "next/image";
import team1 from "@/public/team/Tomas.jpg";
import linkedIn from "@/public/linkedIn.svg";
import { useState } from "react";
import TeamMember from "./team-member";

export default function Team() {
  const [showPicture, setShowPicture] = useState({
    team1: true,
    team2: true,
    team3: true,
    mentor: true,
    team4: true,
    team5: true,
    team6: true,
  });

  return (
    <div className="flex flex-col w-fit h-fit p-1 sm:p-4 mb-2 justify-center items-center grow bg-emerald-200 rounded-3xl border-2 border-solid border-slate-300">
      <h1 className="font-extrabold text-3xl m-2 text-slate-600">The NexTicket team</h1>
      <div className="flex flex-col md:flex-row justify-between items-center gap-1 sm:gap-3 sm:m-3 grow">
        <div
          className="aboutUsCard md:origin-top-right md:-rotate-12"
          onMouseOver={() => {
            setShowPicture({ ...showPicture, team1: false });
          }}
          onMouseOut={() => {
            setShowPicture({ ...showPicture, team1: true });
          }}
        >
          <TeamMember name="Tomáš Samseli" team={showPicture.team1} link="https://www.linkedin.com/in/tom%C3%A1%C5%A1-samseli-aa9067272/" picture={team1} />
        </div>
        <div
          className="aboutUsCard"
          onMouseOver={() => {
            setShowPicture({ ...showPicture, team2: false });
          }}
          onMouseOut={() => {
            setShowPicture({ ...showPicture, team2: true });
          }}
        >
          <TeamMember name="Katalin Tünde Kovács" team={showPicture.team2} link="https://www.linkedin.com/in/katunde/" picture="" />
        </div>
        <div className="aboutUsCard md:origin-top-left md:rotate-12">
          <p className="absolute top-1/3 font-bold">Péter Fedorov</p>
          <Image src="" alt="photo of the team member" className="object-fit: contain hover:invisible z-10"></Image>
          <Link href="https://www.linkedin.com/in/peter-fedorov-665401199/" className="aboutUsLink">
            <Image src={linkedIn} alt="LinkedIn icon"></Image>
          </Link>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="aboutUsCard">
          <p className="absolute top-1/3 font-bold">Attila Krüpl</p>
          <Image src="" alt="photo of the team member" className="object-fit: contain hover:invisible z-10"></Image>
          <Link href="https://www.linkedin.com/in/attila-krupl-dr/" className="aboutUsLink">
            <Image src={linkedIn} alt="LinkedIn icon"></Image>
          </Link>
        </div>
        <p className="font-bold text-xl text-slate-600">GreenFox mentor</p>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-1 sm:gap-3 sm:m-3 grow">
        <div className="aboutUsCard md:origin-bottom-right md:rotate-12">
          <p className="absolute top-1/3 font-bold">Attila Tápai</p>
          <Image src="" alt="photo of the team member" className="object-fit: contain hover:invisible z-10"></Image>
          <Link href="https://www.linkedin.com/in/attila-t%C3%A1pai-3a976587/" className="aboutUsLink">
            <Image src={linkedIn} alt="LinkedIn icon"></Image>
          </Link>
        </div>
        <div className="aboutUsCard">
          <p className="absolute top-1/3 font-bold">Víťa Dolejší</p>
          <Image src="" alt="photo of the team member" className="object-fit: contain hover:invisible z-10"></Image>
          <Link href="" className="aboutUsLink">
            <Image src={linkedIn} alt="LinkedIn icon"></Image>
          </Link>
        </div>
        <div className="aboutUsCard md:origin-bottom-left md:-rotate-12">
          <p className="absolute top-1/3 font-bold">Váradi Olivér</p>
          <Image src="" alt="photo of the team member" className="object-fit: contain hover:invisible z-10"></Image>
          <Link href="https://www.linkedin.com/in/oliver-varadi-b138a2250/" className="aboutUsLink">
            <Image src={linkedIn} alt="LinkedIn icon"></Image>
          </Link>
        </div>
      </div>
    </div>
  );
}
