"use client";
import Image from "next/image";
import style from "../app/page.css";

export default function Home() {
  return (
    <>
      <div className="container">
        <div className="logo">
          <Image src="/logo.png" alt="liveload logo" width={118} height={65} />
        </div>
      </div>
    </>
  );
}
