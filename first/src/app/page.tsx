import Hero from "@/components/hero";
import img1 from "../../public/img3.jpg";
import { Button } from "@heroui/button";
export default function Home() {
  return (
    <div className="flex flex-col justify-center">
      <Hero imgData={img1} imgAlt="idk" title="Professional Snipper" />
      <Button color="success">Button</Button>
    </div>
  );
}
