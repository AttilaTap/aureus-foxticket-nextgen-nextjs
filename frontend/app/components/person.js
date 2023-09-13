import { useState } from "react";
import TeamMember from "./team-member";

export default function Person({ name, link, classes, avatar }) {
  const [showPicture, setShowPicture] = useState(true);

  return (
    <>
      <div
        className={`aboutUsCard ${classes}`}
        onMouseOver={() => {
          setShowPicture(false);
        }}
        onMouseOut={() => {
          setShowPicture(true);
        }}
      >
        <TeamMember name={`${name}`} team={showPicture} link={`${link}`} picture={avatar} />
      </div>
    </>
  );
}
