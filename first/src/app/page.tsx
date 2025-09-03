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
    <div className="w-full min-h-screen bg-gradient-to-r from-[#dfe2fe] via-[#b1cbfa] to-[#8e98f5]">
      {/* Hero Section */}
      <Hero imgData={img1} imgAlt="Professional coding" title="Professional Snipper" />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Top Posts */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-xl shadow-lg p-6 border border-border hover:shadow-xl transition-shadow duration-300">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Top Posts</h1>
                  <p className="text-sm text-muted-foreground mt-1">Most discussed snippets in the community</p>
                </div>
                <Link 
                  href="/snippets/all-snips" 
                  className="px-4 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 whitespace-nowrap"
                >
                  View All Snippets
                </Link>
              </div>
              
              <div className="bg-muted/30 rounded-lg border border-dashed border-muted-foreground/20 min-h-[400px]">
                <PostList fetchData={fetchTopPosts} />
              </div>
            </div>
          </div>
          
          {/* Right Column - Topics */}
          <div className="flex flex-col gap-8">
            {/* Create Topic Card */}
            <div className="bg-card rounded-xl shadow-lg p-6 border border-border hover:shadow-xl transition-shadow duration-300">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-foreground">Create Topic</h2>
                <p className="text-sm text-muted-foreground mt-1">Start a new discussion</p>
              </div>
              <TopicCreateForm />
            </div>
            
            {/* Topics List Card */}
            <div className="bg-card rounded-xl shadow-lg p-6 border border-border hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-bold text-foreground">Topics</h2>
                  <p className="text-sm text-muted-foreground mt-1">Browse categories</p>
                </div>
                <Link 
                  href="/topics" 
                  className="text-sm text-primary hover:text-primary/80 hover:underline transition-colors duration-200"
                >
                  View All
                </Link>
              </div>
              
              <Separator className="my-4 bg-border" />
              
              <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
                <TopicList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}