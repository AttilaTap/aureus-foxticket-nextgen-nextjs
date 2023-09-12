"use client";
import team1 from "@/public/team/Tomas.jpg";
import team2 from "@/public/team/kati.jpg";
import team3 from "@/public/team/Peter.jpg";
import mentor from "@/public/team/Krupl_Attila.jpeg";
import team5 from "@/public/team/Vita.jpg";
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
    <div className="flex flex-col w-fit h-fit p-1 sm:p-4 mb-2 justify-center items-center grow bg-emerald-300 rounded-3xl border-2 border-solid border-slate-300">
      <h1 className="font-extrabold text-3xl m-2 text-slate-600 drop-shadow-2xl">The NexTicket team</h1>
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
          <TeamMember name="Katalin Tünde Kovács" team={showPicture.team2} link="https://www.linkedin.com/in/katunde/" picture={team2} />
        </div>
        <div
          className="aboutUsCard md:origin-top-left md:rotate-12"
          onMouseOver={() => {
            setShowPicture({ ...showPicture, team3: false });
          }}
          onMouseOut={() => {
            setShowPicture({ ...showPicture, team3: true });
          }}
        >
          <TeamMember name="Péter Fedorov" team={showPicture.team3} link="https://www.linkedin.com/in/peter-fedorov-665401199/" picture={team3} />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div
          className="aboutUsCard"
          onMouseOver={() => {
            setShowPicture({ ...showPicture, mentor: false });
          }}
          onMouseOut={() => {
            setShowPicture({ ...showPicture, mentor: true });
          }}
        >
          <TeamMember name="Attila Krüpl" team={showPicture.mentor} link="https://www.linkedin.com/in/attila-krupl-dr/" picture={mentor} />
        </div>
        <p className="font-bold text-xl text-slate-600">GreenFox mentor</p>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-1 sm:gap-3 sm:m-3 grow">
        <div
          className="aboutUsCard md:origin-bottom-right md:rotate-12"
          onMouseOver={() => {
            setShowPicture({ ...showPicture, team4: false });
          }}
          onMouseOut={() => {
            setShowPicture({ ...showPicture, team4: true });
          }}
        >
          <TeamMember name="Attila Tápai" team={showPicture.team4} link="https://www.linkedin.com/in/attila-t%C3%A1pai-3a976587/" picture="" />
        </div>
        <div
          className="aboutUsCard"
          onMouseOver={() => {
            setShowPicture({ ...showPicture, team5: false });
          }}
          onMouseOut={() => {
            setShowPicture({ ...showPicture, team5: true });
          }}
        >
          <TeamMember name="Víťa Dolejší" team={showPicture.team5} link="https://www.linkedin.com/in/v%C3%ADt-dolej%C5%A1%C3%AD-965242291/" picture={team5} />
        </div>
        <div
          className="aboutUsCard md:origin-bottom-left md:-rotate-12"
          onMouseOver={() => {
            setShowPicture({ ...showPicture, team6: false });
          }}
          onMouseOut={() => {
            setShowPicture({ ...showPicture, team6: true });
          }}
        >
          <TeamMember name="Váradi Olivér" team={showPicture.team6} link="https://www.linkedin.com/in/oliver-varadi-b138a2250/" picture="" />
        </div>
      </div>
    </div>
  );
}
