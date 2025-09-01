// import Hero from "@/components/hero";
// import img1 from "../../public/img3.jpg";
// import { Button } from "@heroui/button";
// export default function Home() {
//   return (
//     <div className="flex flex-col justify-center">

//       <Hero imgData={img1} imgAlt="idk" title="Professional Snipper" />
//       <Button color="success">Button</Button>
//     </div>
//   );
// }

import TopicCreateForm from "@/components/topic-create-form";

export default function Home() {
  return (
    <div className="grid grid-cols-4 gap-4 p-4 mt-18">
      <div className="col-span-3">
        <h1 className="text-xl m-2">Top Posts</h1>
      </div>
      <div className="flex justify-center">
        <TopicCreateForm />
      </div>
    </div>
  );
}
