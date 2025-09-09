import Image from "next/image";
import MaisonHero from "./components/MaisonHero";

export default function Home() {
  return (
    <div className="p-0 m-0 h-[100dvh] overflow-hidden">
      <MaisonHero />
    </div>
  );
}
