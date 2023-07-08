import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex flex-col h-16">
      <Link href="" className="ml-3 mt-3 font-medium">
        About us
      </Link>
      <Link href="" className="ml-3 mt-1 mb-3 font-medium">
        How it works
      </Link>
    </div>
  );
}
