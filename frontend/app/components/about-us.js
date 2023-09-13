"use client";
import attila_img from "@/public/team/at.jpg";
import attilam_img from "@/public/team/ak.jpeg";
import kati_img from "@/public/team/kk.jpg";
import oliver_img from "@/public/team/ov.jpg";
import peter_img from "@/public/team/pf.jpg";
import tomas_img from "@/public/team/ts.jpg";
import vita_img from "@/public/team/vd.jpg";

import Person from "./person";

export default function Team() {
  return (
    <div className="flex flex-col w-fit h-fit p-1 sm:p-4 mb-2 justify-center items-center grow bg-emerald-300 rounded-3xl border-2 border-solid border-slate-300">
      <h1 className="font-extrabold text-3xl m-2 text-slate-600 drop-shadow-2xl">The NexTicket team</h1>
      <div className="flex flex-col md:flex-row justify-between items-center gap-1 sm:gap-3 sm:m-3 grow">
        <Person name="Tomáš Samseli" link="https://www.linkedin.com/in/tom%C3%A1%C5%A1-samseli-aa9067272/" classes="md:origin-top-right md:-rotate-12" avatar={tomas_img} />
        <Person name="Katalin Tünde Kovács" link="https://www.linkedin.com/in/katunde/" classes="" avatar={kati_img} />
        <Person name="Péter Fedorov" link="https://www.linkedin.com/in/peter-fedorov-665401199/" classes="md:origin-top-left md:rotate-12" avatar={peter_img} />
      </div>
      <div className="flex flex-col justify-center items-center">
        <Person name="Attila Krüpl" link="https://www.linkedin.com/in/attila-krupl-dr/" classes="" avatar={attilam_img} />
        <p className="font-bold text-xl text-slate-600">GreenFox mentor</p>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-1 sm:gap-3 sm:m-3 grow">
        <Person name="Attila Tápai" link="https://www.linkedin.com/in/attila-t%C3%A1pai-3a976587/" classes="md:origin-bottom-right md:rotate-12" avatar={attila_img} />
        <Person name="Víťa Dolejší" link="https://www.linkedin.com/in/v%C3%ADt-dolej%C5%A1%C3%AD-965242291/" classes="" avatar={vita_img} />
        <Person name="Váradi Olivér" link="https://www.linkedin.com/in/oliver-varadi-b138a2250/" classes="md:origin-bottom-left md:-rotate-12" avatar={oliver_img} />
      </div>
    </div>
  );
}
