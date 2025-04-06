import Image from "next/image";
import Carousal from "@/components/Carousal";
import Items from "@/components/Items";
import CarousalMini from "@/components/CarousalMini";
import Offers from "@/components/Offers";
import Cards from "@/components/Cards";

export default function Home() {
  
  return (
    <div className="z-20 ">
      <Image src="/hero.webp" alt="Hero Image" width={1600} height={300} className="w-full h-auto object-cover" />
      <Carousal />
      <Items />
      <div className="px-5 py-3">

      <Offers />
      </div>
      {/* <CarousalMini /> */}
    </div>
  );
}
