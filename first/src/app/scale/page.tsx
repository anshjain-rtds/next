import Image from "next/image";
import Hero from "@/components/hero";
import img3 from "../../../public/img3.jpg"
export default function Home() {
  return <Hero imgData={img3} imgAlt="idk" title="professional mad"/>;
}
