import Image from "next/image";
import Hero from "@/components/hero";
import img2 from "../../../public/img2.jpeg";
export default function Home() {
  return <Hero imgData={img2} imgAlt="idk" title="professional pagal"/>;
}
