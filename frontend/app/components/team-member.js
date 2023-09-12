import Link from "next/link";
import Image from "next/image";
import linkedIn from "@/public/linkedIn.svg";

export default function TeamMember({ name, team, link, picture }) {
  return (
    <>
      <p className="absolute top-1/4 font-normal md:font-bold text-lg md:text-sm lg:text-base text-center p-1">{name}</p>
      <Image src={picture} alt="photo of the team member" className={team ? `object-fit: contain z-10` : `invisible object-fit: contain z-10`}></Image>
      <Link href={link} className="aboutUsLink">
        <Image src={linkedIn} alt="LinkedIn icon"></Image>
      </Link>
    </>
  );
}
