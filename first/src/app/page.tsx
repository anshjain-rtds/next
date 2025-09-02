import Hero from "@/components/hero";
import img1 from "../../public/img3.jpg";
import TopicCreateForm from "@/components/topics/topic-create-form";
import TopicList from "@/components/topics/topic-list";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import PostList from "@/components/posts/post-list";
import { fetchTopPosts } from "@/db/queries/posts";

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <Hero imgData={img1} imgAlt="Professional coding" title="Professional Snipper" />
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 py-12">
        {/* Left Column - Top Posts */}
        <div className="lg:col-span-3">
          <div className="bg-card rounded-xl shadow-lg p-6 border border-border">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-foreground">Top Posts</h1>
              <Link 
                href="/snippets/all-snips" 
                className="px-4 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
              >
                View All Snippets
              </Link>
            </div>
            <div className="py-4 px-4 flex items-center justify-center bg-muted rounded-lg border-2 border-dashed border-border">
              {/* <p className="text-muted-foreground">Top posts content will be displayed here</p> */}
              <PostList fetchData={fetchTopPosts}/>
            </div>
          </div>
        </div>
        
        {/* Right Column - Topics */}
        <div className="flex flex-col gap-6">
          <div className="bg-card rounded-xl shadow-lg p-6 border border-border">
            <h2 className="text-xl font-bold text-foreground mb-4">Create Topic</h2>
            <TopicCreateForm />
          </div>
          
          <div className="bg-card rounded-xl shadow-lg p-6 border border-border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-foreground">Topics</h2>
              <Link 
                href="/topics" 
                className="text-sm text-primary hover:underline"
              >
                View All
              </Link>
            </div>
            <Separator className="my-4 bg-border" />
            <div className="max-h-96 overflow-y-auto">
              <TopicList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
