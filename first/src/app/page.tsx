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

import TopicCreateForm from "@/components/topics/topic-create-form";
import TopicList from "@/components/topics/topic-list";
import { Separator } from "@/components/ui/separator"
export default function Home() {
  return (
    <div className="grid grid-cols-4 gap-4 px-4 py-24">
      <div className="col-span-3">
        <h1 className="text-xl font-semibold m-2">Top Posts</h1>
      </div>
      <div className="flex flex-col justify-center border shadow py-3 px-2">
        <TopicCreateForm />
        <Separator className="my-2  bg-gray-600 max-w-[100%]"/>
        <h3 className="text-xl font-semibold">Topics</h3>
        <TopicList/> 
      </div>
    </div>
  );
}
